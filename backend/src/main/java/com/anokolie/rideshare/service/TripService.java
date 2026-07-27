package com.anokolie.rideshare.service;

import com.anokolie.rideshare.model.drivers.Driver;
import com.anokolie.rideshare.dto.trips.TripObject;
import com.anokolie.rideshare.model.trips.Trips;
import com.anokolie.rideshare.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {
    private final TripRepository repository;

    public TripService(TripRepository repository){
        this.repository = repository;
    }

    public Trips createRide (Trips trip) {
        return repository.save(trip);
    }
    public List<Trips> getAllRides (){
        return repository.findAll();
    }

    public Trips getAllRidesByDriver(Long driverId){
        return repository.findById(driverId).orElse(null);
    }
    public List<Driver> matchDrivers(TripObject trip){
        return repository.findMatchingDrivers(trip.getPickupLng(), trip.getPickupLat(), 5);
    }
}
