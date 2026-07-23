package com.anokolie.RideShare.service;

import com.anokolie.RideShare.model.tripEvents.TripEvents;
import com.anokolie.RideShare.model.trips.Trips;
import com.anokolie.RideShare.repository.TripRepository;
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

    public Trips matching()
}
