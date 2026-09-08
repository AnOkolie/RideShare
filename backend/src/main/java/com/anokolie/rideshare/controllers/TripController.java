package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.trips.CreateTripRequest;
import com.anokolie.rideshare.dto.trips.TripQuoteResponse;
import com.anokolie.rideshare.dto.trips.TripRequest;
import com.anokolie.rideshare.dto.trips.TripResponse;
import com.anokolie.rideshare.service.trips.TripService;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
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
    public TripResponse requestTrip (@NotNull @RequestBody TripRequest trip, @AuthenticationPrincipal Jwt jwt){
        try{
            return service.requestTrip(jwt.getSubject(), trip);
        } catch (RuntimeException e) {
            System.out.println("Trip error is: "+e.getMessage());
            throw new RuntimeException(e);
        }
    }
    @PostMapping("/quote")
    public ResponseEntity<TripQuoteResponse> requestTripQuote (@NotNull @RequestBody CreateTripRequest trip, @AuthenticationPrincipal Jwt jwt){
        System.out.println("create trip " + trip);
        try{
            return ResponseEntity.ok(service.calculateFare(trip));
        }catch (Exception exception) {
//            return ResponseEntity.internalServerError()
//                    .body("Error calling Google Routes API: " + exception.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
