package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.trips.CreateTripRequest;
import com.anokolie.rideshare.dto.trips.TripObject;
import com.anokolie.rideshare.dto.trips.TripResponse;
import com.anokolie.rideshare.model.trips.Trips;
import com.anokolie.rideshare.service.TripService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/trips")
public class TripController {
    private final TripService service;

    public TripController(TripService service) {
        this.service = service;
    }
    @PostMapping("/")
    public TripResponse requestTrip (@RequestBody CreateTripRequest trip, @AuthenticationPrincipal Jwt jwt){
        return service.requestTrip(jwt.getSubject(), trip);
    }
}
