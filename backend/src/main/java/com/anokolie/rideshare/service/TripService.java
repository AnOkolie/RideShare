package com.anokolie.rideshare.service;

import com.anokolie.rideshare.dto.route.Route;
import com.anokolie.rideshare.dto.route.RouteResponse;
import com.anokolie.rideshare.dto.trips.CreateTripRequest;
import com.anokolie.rideshare.dto.trips.TripQuoteResponse;
import com.anokolie.rideshare.dto.trips.TripResponse;
import com.anokolie.rideshare.entity.*;
import com.anokolie.rideshare.enums.TripEventType;
import com.anokolie.rideshare.enums.TripStatus;
import com.anokolie.rideshare.dto.trips.TripObject;
import com.anokolie.rideshare.repository.RiderRepository;
import com.anokolie.rideshare.repository.TripRepository;
import com.anokolie.rideshare.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.lang.Float.parseFloat;
import static java.lang.Integer.parseInt;

@Service
@AllArgsConstructor
public class TripService {
    private final TripRepository repository;
    private final UserRepository userRepository;
    private final RiderRepository riderRepository;
    private final RouteService routeService;
    private static final GeometryFactory GEOMETRY_FACTORY = new GeometryFactory(new PrecisionModel(), 4326);
    public Trips createRide (Trips trip) {
        return repository.save(trip);
    }
    @Transactional
    public TripResponse requestTrip(String authSubject, CreateTripRequest request) {
        User user = userRepository.findByCognitoSub(authSubject)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        RiderProfile rider = riderRepository.findById(user.getId())
                .orElseThrow(() -> new IllegalStateException("Rider profile not found"));
        Trips trip = new Trips();
        trip.setRider(rider);
        trip.setStatus(TripStatus.REQUESTED);

        trip.setPickupAddress(request.pickupAddress());
        trip.setPickupLocation(generatePoint(request.pickupLongitude(), request.pickupLatitude()));

        trip.setDestinationAddress(request.destinationAddress());
        trip.setDestinationLocation(generatePoint(request.pickupLongitude(), request.pickupLatitude()));

        // Replace these placeholders with a route/distance API result later.
        trip.setEstimatedDistance(3.8);
        trip.setEstimatedDuration(12);
        trip.setFareCents(1250);

        trip.setRequestedAt(LocalDateTime.now());

        TripEvent requestedEvent = new TripEvent();
        requestedEvent.setTrip(trip);
        requestedEvent.setEventType(TripEventType.REQUESTED);
        requestedEvent.setCreatedAt(LocalDateTime.now());

        trip.setEvents(new ArrayList<>(List.of(requestedEvent)));
        System.out.println("Adding trip with structure: " + trip.toString());
        Trips savedTrip = repository.save(trip);
        return TripResponse.from(savedTrip);
    }
    private Point generatePoint(Double lng, Double lat){
        Point point= GEOMETRY_FACTORY.createPoint(
                new Coordinate(lng, lat)
        );
        point.setSRID(4326);

        return point;
    }
    public TripQuoteResponse calculateFare(CreateTripRequest trip){
        final double BASE_FARE=5.50;
        final double COST_PER_MIN=0.35;
        final double COST_PER_MILE =1.35;
        try{
            RouteResponse response = routeService.calculateDistance(trip.pickupLatitude(), trip.pickupLongitude(), trip.destinationLatitude(), trip.destinationLongitude());
            if (response == null ||
                    response.routes() == null ||
                    response.routes().isEmpty()) {
                throw new RuntimeException("No route returned by Google");
            }
            Route route = response.routes().getFirst();
            int duration = parseInt(justNumbers(route.duration()));
            Double fare = BASE_FARE + (route.distanceMeters()*COST_PER_MILE) + (duration*COST_PER_MIN);
            return new TripQuoteResponse(
                    route.distanceMeters(),
                    duration,
                    fare
            );
        }catch(RuntimeException e){
            throw new RuntimeException(e);
        }
    }
    public List<Trips> getAllRides (){
        return repository.findAll();
    }

    public Trips getAllRidesByDriver(Long driverId){
        return repository.findById(driverId).orElse(null);
    }
    public List<DriverProfile> matchDrivers(TripObject trip){
        return repository.findMatchingDrivers(trip.getPickupLng(), trip.getPickupLat(), 5);
    }
    public String justNumbers(String val){
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i<val.length();i++){
            char c = val.charAt(i);
            if (c >= '0' && c <= '9') {
                sb.append(c);
            }else{
                break;
            }
        }
        return sb.toString();
    }
}
