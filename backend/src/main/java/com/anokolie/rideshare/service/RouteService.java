package com.anokolie.rideshare.service;

import com.anokolie.rideshare.dto.route.RouteResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.util.Map;

@Service
public class RouteService {
    private final RestClient restClient;
    private final String googleApiKey;

    public  RouteService(RestClient.Builder restClientBuilder,  @Value("${google.api.key}") String apiKey){
        this.restClient = restClientBuilder.build();
        this.googleApiKey = apiKey;
    }

    public RouteResponse calculateDistance(
            Double pickupLat,
            Double pickupLng,
            Double destLat,
            Double destLng
    ) {
        String googleUrl =
                "https://routes.googleapis.com/directions/v2:computeRoutes";

        Map<String, Object> googlePayload = Map.of(
                "origin", Map.of(
                        "location", Map.of(
                                "latLng", Map.of(
                                        "latitude", pickupLat,
                                        "longitude", pickupLng
                                )
                        )
                ),
                "destination", Map.of(
                        "location", Map.of(
                                "latLng", Map.of(
                                        "latitude", destLat,
                                        "longitude", destLng
                                )
                        )
                ),
                "travelMode", "DRIVE",
                "routingPreference", "TRAFFIC_AWARE"
        );

        try {
            return restClient.post()
                    .uri(googleUrl)
                    .contentType(MediaType.APPLICATION_JSON)
                    .header("X-Goog-Api-Key", googleApiKey)
                    .header(
                            "X-Goog-FieldMask",
                            "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
                    )
                    .body(googlePayload)
                    .retrieve()
                    .body(RouteResponse.class);

        } catch (RestClientResponseException exception) {
            System.out.println(
                    "Google Routes error: " + exception.getResponseBodyAsString()
            );

            throw new RuntimeException(
                    exception.getResponseBodyAsString(),
                    exception
            );
        }
    }
}
