package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.trips.*;
import com.anokolie.rideshare.service.trips.TripService;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/trips")
@Slf4j

public class TripController {
    private final TripService service;

    public TripController(TripService service) {
        this.service = service;
    }
    @PostMapping("/")
    public ResponseEntity<TripResponse> requestTrip (@NotNull @RequestBody TripRequest trip, @AuthenticationPrincipal Jwt jwt){
        try{
            return ResponseEntity.ok().body(service.requestTrip(jwt.getSubject(), trip));
        } catch (RuntimeException e) {
            System.out.println("Trip error is: "+e.getMessage());
            throw new RuntimeException(e);
        }
    }
    @PostMapping("/quote")
    public ResponseEntity<TripQuoteResponse> requestTripQuote (@NotNull @RequestBody CreateTripRequest trip){
        System.out.println("create trip " + trip);
        try{
            return ResponseEntity.ok(service.calculateFare(trip));
        }catch (Exception exception) {
            log.error("error creating trip quote {}",exception.getMessage());
//            return ResponseEntity.internalServerError()
//                    .body("Error calling Google Routes API: " + exception.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    @PatchMapping("/accept/{tripId}")
    public ResponseEntity<TripResponse> acceptTrip(@PathVariable Long tripId, @RequestBody DriverAcceptResponse response){
        try{
            return ResponseEntity.ok().body(service.acceptTrip(response.driverId(),tripId));
        }catch(Exception e){
            log.error("Failed to accept trip {}",e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<TripResponse> getTripById(@PathVariable Long tripId){
        try{
            TripResponse response = service.toTripResponse(service.getTripById(tripId));
            return ResponseEntity.ok().body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PatchMapping("/{tripId}/start")
    public ResponseEntity<TripResponse> startTrip(@PathVariable Long tripId){
        try{
            return ResponseEntity.ok().body(service.startTrip(tripId));
        } catch (RuntimeException e) {
            log.error("Error in trip start {}",e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/rider")
    public ResponseEntity<TripResponse> getRiderActiveTripById(Principal principal){
        try{
            return ResponseEntity.ok().body(service.getActiveTripForRider(principal));
        } catch (RuntimeException e) {
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/driver")
    public ResponseEntity<TripResponse> getDriverActiveTripById(Principal principal){
        try{
            return ResponseEntity.ok().body(service.getActiveTripForDriver(principal));
        } catch (RuntimeException e) {
            log.error("get active driver trips: {}", e.getMessage());
            return ResponseEntity.ok().build();
        }
    }
}
