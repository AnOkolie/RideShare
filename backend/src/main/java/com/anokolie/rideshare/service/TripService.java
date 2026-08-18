package com.anokolie.rideshare.service;

import com.anokolie.rideshare.dto.trips.CreateTripRequest;
import com.anokolie.rideshare.dto.trips.TripResponse;
import com.anokolie.rideshare.entity.RiderProfile;
import com.anokolie.rideshare.entity.Trip;
import com.anokolie.rideshare.entity.TripEvent;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.enums.TripEventType;
import com.anokolie.rideshare.enums.TripStatus;
import com.anokolie.rideshare.model.drivers.Driver;
import com.anokolie.rideshare.dto.trips.TripObject;
import com.anokolie.rideshare.model.trips.Trips;
import com.anokolie.rideshare.repository.RiderRepository;
import com.anokolie.rideshare.repository.TripRepository;
import com.anokolie.rideshare.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TripService {
    private final TripRepository repository;
    private final UserRepository userRepository;
    private final RiderRepository riderRepository;

    public TripService(TripRepository repository, UserRepository userRepository, RiderRepository riderRepository){
        this.repository = repository;
        this.userRepository = userRepository;
        this.riderRepository = riderRepository;
    }

    public Trip createRide (Trip trip) {
        return repository.save(trip);
    }
    public TripResponse requestTrip(String authSubject, CreateTripRequest request){
        User user = userRepository.findByCognitoSub(authSubject).orElseThrow(() -> new Error("User not found"));
        RiderProfile rider = riderRepository.findById(user.getId()).orElseThrow(() -> new Error("Rider profile not found"));
        int estimatedFareCents = 1250;
        Trip trip = new Trip();
        trip.setRider(rider);
        trip.setStatus(TripStatus.REQUESTED);
        trip.setPickupAddress(request.pickupAddress());
        trip.setDestinationAddress(request.destinationAddress());
        trip.setFareCents(estimatedFareCents);
        trip.setRequestedAt(LocalDateTime.now());
        TripEvent requestedEvent = new TripEvent();
        requestedEvent.setTrip(trip);
        requestedEvent.setEventType(TripEventType.REQUESTED);
        requestedEvent.setCreatedAt(LocalDateTime.now());

        trip.setEvents(List.of(requestedEvent));

        Trip savedTrip = repository.save(trip);

        return TripResponse.from(savedTrip);
    }
    public List<Trip> getAllRides (){
        return repository.findAll();
    }

    public Trip getAllRidesByDriver(Long driverId){
        return repository.findById(driverId).orElse(null);
    }
    public List<Driver> matchDrivers(TripObject trip){
        return repository.findMatchingDrivers(trip.getPickupLng(), trip.getPickupLat(), 5);
    }
}
