package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.route.RouteRequest;
import com.anokolie.rideshare.dto.route.RouteResponse;
import com.anokolie.rideshare.service.RouteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@AllArgsConstructor
@Slf4j
public class RouteController {
    private final RouteService routeService;
    @PostMapping("/calculate")
    public ResponseEntity<?> calculateDistance(
            @Valid @RequestBody RouteRequest routeRequest
    ) {
        try {
            RouteRequest.AddressWrapper origin = routeRequest.getOrigin();
            RouteRequest.AddressWrapper dest = routeRequest.getDestination();
            RouteResponse response = routeService.calculateDistance(origin.getLatitude(), origin.getLongitude(),dest.getLatitude(), dest.getLongitude());
            return ResponseEntity.ok().body(response);
        } catch (Exception exception) {
            return ResponseEntity.internalServerError()
                    .body("Error calling Google Routes API: " + exception.getMessage());
//            return ResponseEntity.internalServerError().build();
        }
    }
}