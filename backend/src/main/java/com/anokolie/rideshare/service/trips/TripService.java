package com.anokolie.rideshare.service.trips;

import com.anokolie.rideshare.service.stomp.LocationUpdatesService;
import com.anokolie.rideshare.service.stomp.OfferDriverRideService;
import com.anokolie.rideshare.dto.route.Route;
import com.anokolie.rideshare.dto.route.RouteResponse;
import com.anokolie.rideshare.dto.trips.*;
import com.anokolie.rideshare.entity.*;
import com.anokolie.rideshare.enums.TripEventType;
import com.anokolie.rideshare.enums.TripStatus;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.repository.RiderRepository;
import com.anokolie.rideshare.repository.TripRepository;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.RouteService;
import com.anokolie.rideshare.service.redis.DriverLocationCache;
import com.anokolie.rideshare.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
@AllArgsConstructor
@Slf4j
public class TripService {
    private final TripRepository repository;
    private final UserRepository userRepository;
    private final RiderRepository riderRepository;
    private final DriverRepository driverRepository;
    private final RouteService routeService;
    private final UserService userService;
    private final DriverLocationCache driverLocationCache;
    private final OfferDriverRideService offerDriverRideService;
    private final LocationUpdatesService locationUpdatesService;
    private static final GeometryFactory GEOMETRY_FACTORY = new GeometryFactory(new PrecisionModel(), 4326);
    public Trips createRide (Trips trip) {
        return repository.save(trip);
    }
    @Transactional
    public TripResponse requestTrip(String authSubject, TripRequest request) {
        log.info("cognito sub {}",authSubject);
        User user = userRepository.findByCognitoSub(authSubject)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        RiderProfile rider = riderRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalStateException("Rider profile not found"));

        if(!rider.getOnboarding()){
            throw new RuntimeException("You need to complete rider onboarding first!");
        }
        Optional<Trips> activeTrip = repository.findActiveTripByRiderId(rider.getUser().getId());
        if(activeTrip.isPresent()){
            throw new RuntimeException("You currently have an active trip. You can't create a new one right now");
        }
        Trips trip = new Trips();
        trip.setRider(rider);
        trip.setStatus(TripStatus.REQUESTED);

        trip.setPickupAddress(request.trip().pickupAddress());
        trip.setPickupLocation(generatePoint(request.trip().pickupLongitude(), request.trip().pickupLatitude()));

        trip.setDestinationAddress(request.trip().destinationAddress());
        trip.setDestinationLocation(generatePoint(request.trip().pickupLongitude(), request.trip().pickupLatitude()));

        // Replace these placeholders with a route/distance API result later.
        trip.setEstimatedDistance(request.fare().estimatedDistanceMeters());
        trip.setEstimatedDuration(request.fare().estimatedDurationSeconds());
        trip.setFareCents(request.fare().estimatedFareCents());

        trip.setRequestedAt(LocalDateTime.now());

        TripEvent requestedEvent = new TripEvent();
        requestedEvent.setTrip(trip);
        requestedEvent.setEventType(TripEventType.REQUESTED);
        requestedEvent.setCreatedAt(LocalDateTime.now());

        trip.setEvents(new ArrayList<>(List.of(requestedEvent)));
        Trips savedTrip = repository.save(trip);
        driverLocationCache.matchDrivers(authSubject,savedTrip);
        return TripResponse.from(savedTrip);
    }
    private Point generatePoint(Double lng, Double lat){
        Point point= GEOMETRY_FACTORY.createPoint(
                new Coordinate(lng, lat)
        );
        point.setSRID(4326);

        return point;
    }
    public TripQuoteResponse calculateFare(CreateTripRequest trip) {

        final long BASE_FARE_CENTS = 500;      // $5.00
        final long COST_PER_KM_CENTS = 120;    // $1.20 / km
        final long COST_PER_MIN_CENTS = 30;    // $0.30 / min
        final long MINIMUM_FARE_CENTS = 700;   // $7.00

        RouteResponse response = routeService.calculateDistance(
                trip.pickupLatitude(),
                trip.pickupLongitude(),
                trip.destinationLatitude(),
                trip.destinationLongitude()
        );

        if (response == null ||
                response.routes() == null ||
                response.routes().isEmpty()) {
            throw new RuntimeException("No route returned by Google");
        }

        Route route = response.routes().getFirst();

        int distanceMeters = route.distanceMeters();

        int durationSeconds =
                Integer.parseInt(
                        route.duration().replace("s", "")
                );

        double distanceKm = distanceMeters / 1000.0;
        double durationMinutes = durationSeconds / 60.0;

        long distanceCharge = Math.round(
                distanceKm * COST_PER_KM_CENTS
        );

        long timeCharge = Math.round(
                durationMinutes * COST_PER_MIN_CENTS
        );

        long calculatedFare =
                BASE_FARE_CENTS
                        + distanceCharge
                        + timeCharge;

        long finalFare = Math.max(
                calculatedFare,
                MINIMUM_FARE_CENTS
        );

        return new TripQuoteResponse(
                distanceMeters,
                durationSeconds,
                finalFare
        );
    }
    public List<Trips> getAllRides (){
        return repository.findAll();
    }

    public Trips getAllRidesByDriver(Long driverId){
        return repository.findById(driverId).orElse(null);
    }

    public TripResponse acceptTrip(Long driverId, Long tripId){
        log.info("This driverId is: {}",driverId);
        Trips trip = repository.findById(tripId).orElseThrow(()-> new RuntimeException("This trip doesnt exist"));
        DriverProfile driver = driverRepository.findById(driverId).orElseThrow(() -> new RuntimeException("This driver doesn't exist"));
        trip.setDriver(driver);
        trip.setStatus(TripStatus.ACCEPTED);
        TripResponse tripResponse = TripResponse.from(repository.save(trip));
        offerDriverRideService.rideAccepted(tripResponse);
        return tripResponse;
    }
    public Trips getTripById(Long tripId){
        return repository.findById(tripId).orElseThrow(()->new RuntimeException("This trip does not exist"));
    }
    public TripResponse toTripResponse(Trips trip){
        return TripResponse.from(trip);
    }
    public TripResponse getActiveTripForDriver(Principal principal){
        User user = userService.getUserFromPrincipal(principal);
        return toTripResponse(repository.findActiveTripByDriverId(user.getId()).orElseThrow(() -> new RuntimeException("There are no existing trips")));
    }

    public TripResponse getActiveTripForRider(Principal principal){
        User user = userService.getUserFromPrincipal(principal);
        return toTripResponse(repository.findActiveTripByRiderId(user.getId()).orElseThrow(() -> new RuntimeException("There are no existing trips")));
    }

    public TripResponse startTrip(Long tripId){
        Trips trip = repository.findById(tripId).orElseThrow(()->new RuntimeException("This trip does not exist"));
        trip.setStatus(TripStatus.IN_PROGRESS);
        trip.setArrivedAt(LocalDateTime.now());
        trip.setStartedAt(LocalDateTime.now());
        locationUpdatesService.tripStatusUpdates(tripId);
        return toTripResponse(repository.save(trip));
    }
}
