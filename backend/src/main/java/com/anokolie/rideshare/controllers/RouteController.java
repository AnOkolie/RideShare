package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.route.RouteRequest;
import com.anokolie.rideshare.dto.route.RouteResponse;
import com.anokolie.rideshare.service.RouteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
@AllArgsConstructor
public class RouteController {
    private final RouteService routeService;
    @PostMapping("/calculate")
    public ResponseEntity<RouteResponse> calculateDistance(
            @Valid @RequestBody RouteRequest routeRequest
    ) {
        try {
            RouteRequest.AddressWrapper origin = routeRequest.getOrigin();
            RouteRequest.AddressWrapper dest = routeRequest.getOrigin();
            RouteResponse response = routeService.calculateDistance(origin.getLatitude(), origin.getLongitude(),dest.getLatitude(), dest.getLongitude());
            return ResponseEntity.ok(response);
        } catch (Exception exception) {
//            return ResponseEntity.internalServerError()
//                    .body("Error calling Google Routes API: " + exception.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}