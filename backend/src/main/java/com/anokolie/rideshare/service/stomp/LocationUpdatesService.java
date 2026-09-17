package com.anokolie.rideshare.service.stomp;

import com.anokolie.rideshare.dto.route.RouteResponse;
import com.anokolie.rideshare.dto.trips.DriverArrival;
import com.anokolie.rideshare.dto.trips.DriverLocationUpdates;
import com.anokolie.rideshare.dto.trips.TripStatusUpdate;
import com.anokolie.rideshare.entity.DriverLocation;
import com.anokolie.rideshare.entity.Trips;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.enums.TripStatus;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.repository.TripRepository;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.HaversineService;
import com.anokolie.rideshare.service.RouteService;
import com.anokolie.rideshare.service.redis.DriverLocationCache;
import com.anokolie.rideshare.service.trips.TripService;
import com.anokolie.rideshare.service.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Map;

import static com.anokolie.rideshare.enums.DriverArrivalStatus.ARRIVED;

@Service
@AllArgsConstructor
@Slf4j
public class LocationUpdatesService {
    private final SimpMessagingTemplate messagingTemplate;
    private final HaversineService haversineService;
    private final UserService userService;
    private final RouteService routeService;
    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final DriverRepository driverRepository;
    private final DriverLocationCache locationCache;

    public void arrivedEligible (boolean eligible, Long tripId){
        DriverArrival driverArrival= new DriverArrival(ARRIVED);
        Trips trip = tripRepository.findById(tripId).orElseThrow(()-> new RuntimeException("This trip doesnt exist"));
        User driver = userRepository.findById(trip.getDriver().getUser().getId()).orElseThrow(()-> new RuntimeException("There is no matching driver"));
        if(eligible){
            messagingTemplate.convertAndSendToUser(driver.getCognitoSub(),"/queue/driver/eligible",driverArrival);
        }
    }
    public void completedEligible(boolean completed, Long tripId){
        if(!completed) return;
        TripStatusUpdate status= new TripStatusUpdate(tripId, TripStatus.COMPLETED);
        Trips trip = tripRepository.findById(tripId).orElseThrow(()-> new RuntimeException("This trip doesnt exist"));
        User driver = userRepository.findById(trip.getDriver().getUser().getId()).orElseThrow(()-> new RuntimeException("There is no matching driver"));
        User rider = userRepository.findById(trip.getRider().getUser().getId()).orElseThrow(()-> new RuntimeException("There is no matching rider"));
        String destination = "/queue/trip/"+tripId+"/status";
        messagingTemplate.convertAndSendToUser(driver.getCognitoSub(),destination,status);
        messagingTemplate.convertAndSendToUser(rider.getCognitoSub(),destination,status);
    }
    public void streamLocation(Long tripId, double driverPosLng, double driverPosLat){
        Trips trip = tripRepository.findById(tripId).orElseThrow(()-> new RuntimeException("This trip doesnt exist"));
        User rider = userRepository.findById(trip.getRider().getUser().getId()).orElseThrow(()-> new RuntimeException("There is no matching rider"));
        Map<String,String> etaMap = locationCache.getDriverEta(tripId);
        DriverLocationUpdates updates;
        if(etaMap.isEmpty()){
            //make api call
            double pickupLng = trip.getPickupLocation().getX();
            double pickupLat = trip.getPickupLocation().getY();
            RouteResponse resp = routeService.calculateDistance(driverPosLat,driverPosLng,pickupLat,pickupLng);
            String etaSeconds = resp.routes().getFirst().duration();
            int distanceMeters = resp.routes().getFirst().distanceMeters();
            locationCache.saveDriverEta(tripId,etaSeconds,driverPosLng,driverPosLat,distanceMeters);
            etaMap = locationCache.getDriverEta(tripId);
        }
            String etaSeconds = etaMap.get("etaSeconds");
            double driverLat = Double.parseDouble(etaMap.get("driverLatitude"));
            double driverLng = Double.parseDouble(etaMap.get("driverLongitude"));
            Long distanceMeters  = Long.parseLong(etaMap.get("distanceMeters"));
            updates = new DriverLocationUpdates(driverLat,driverLng,etaSeconds);

        messagingTemplate.convertAndSendToUser(rider.getCognitoSub(),"/queue/driver/eta",updates);
    }
    public void DriverLocationService(@DestinationVariable Long tripId, Principal principal, @DestinationVariable Long driverId, DriverLocation location){
        User user = userService.getUserFromPrincipal(principal);
        log.info("authenticated user: " + user.getId());
        if (!user.getId().equals(driverId)) {
            log.warn("The users dont match User object id: " + user.getId() + " destinationVariable Id: " + driverId);
            throw new AccessDeniedException("Cannot publish for another driver");
        }
        log.info("Driver identity check passed for user {}", user.getId());

        boolean driverProfileExists = driverRepository.existsById(user.getId());

        if (!driverProfileExists) {
            throw new RuntimeException("No driver profile for user " + user.getId());
        }

        log.info("Driver profile confirmed; writing location to Redis");
        Trips trip = tripRepository.findById(tripId).orElseThrow(()->new RuntimeException("This trip does not exist"));
        if(trip.getStatus() == TripStatus.ACCEPTED){
            isArrived(trip,location);
        }else if(trip.getStatus() == TripStatus.IN_PROGRESS){
            log.info("trip states: {}",trip.getStatus());
            isCompleted(trip,location);
        }

        log.info("Location saved to Redis for driver {}", driverId);

    }
    public void isArrived(Trips trip, DriverLocation location){
        Long tripId = trip.getId();
        double driverLng = location.getLongitude();
        double driverLat = location.getLatitude();
        double pickupLng = trip.getPickupLocation().getX();
        double pickupLat = trip.getPickupLocation().getY();

        double distance = haversineService.calculateDistance(driverLat,driverLng,pickupLat,pickupLng);
        boolean canArrive = distance <= Math.max(75, location.getAccuracyMeters() + 25);
        if(canArrive){
            log.info("arriving");
            arrivedEligible(canArrive,tripId);
        }else{
            streamLocation(tripId,driverLng,driverLat);
        }
    }
    public void isCompleted(Trips trip, DriverLocation location){
        Long tripId = trip.getId();
        double driverLng = location.getLongitude();
        double driverLat = location.getLatitude();
        double pickupLng = trip.getPickupLocation().getX();
        double pickupLat = trip.getPickupLocation().getY();

        double distance = haversineService.calculateDistance(driverLat,driverLng,pickupLat,pickupLng);
        boolean complete = distance <= Math.max(75, location.getAccuracyMeters() + 25);
        if(complete){
            log.info("arriving");
            completedEligible(complete,tripId);
        }
    }
    public void tripStatusUpdates(Long tripId){
        Trips trip = tripRepository.findById(tripId).orElseThrow(()->new RuntimeException("This trip doesn't exist"));
        User user = userRepository.findById(trip.getRider().getUser().getId()).orElseThrow(()->new RuntimeException("There is no user for this rider Id"));
        TripStatusUpdate status = new TripStatusUpdate(tripId,trip.getStatus());
        String destination = "/queue/trip/"+tripId+"/status";
        messagingTemplate.convertAndSendToUser(user.getCognitoSub(),destination,status);
    }
}
