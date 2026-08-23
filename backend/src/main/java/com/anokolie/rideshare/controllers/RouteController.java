package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.RouteRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import java.util.Map;

@RestController
@RequestMapping("/api/routes")
public class RouteController {
    @Value("${google.api.key}")
    private String apiKey;
    private RestClient restClient;
    @PostMapping("/calculate")
    public ResponseEntity<String> calculateDistance (@RequestBody RouteRequest routeRequest){
        String googleUrl = "https://googleapis.com" + apiKey;
        Map<String, Object> googlePayload = Map.of(
                "origin", Map.of("address", routeRequest.getOrigin().getAddress()),
                "destination", Map.of("address", routeRequest.getDestination().getAddress()),
                "travelMode", "DRIVE",
                "routingPreference", "TRAFFIC_AWARE"
        );
        try {
            String jsonResponse = restClient.post()
                    .uri(googleUrl)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("X-Goog-FieldMask", "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline")
                    .body(googlePayload)
                    .retrieve()
                    .body(String.class);

            return ResponseEntity.ok(jsonResponse);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error calling Google Routes API: " + e.getMessage());
        }
    }
}
