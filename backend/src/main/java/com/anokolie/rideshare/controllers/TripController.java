package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.model.trips.Trips;
import com.anokolie.rideshare.service.TripService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rides")
public class TripController {
    private final TripService service;

    public TripController(TripService service) {
        this.service = service;
    }
    @PostMapping("/")
    public Trips requestRide (@RequestBody Trips trip){
        return service.createRide(trip);
    }
}
