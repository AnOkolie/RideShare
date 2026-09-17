package com.anokolie.rideshare.service;

import com.anokolie.rideshare.dto.route.RouteResponse;
import com.anokolie.rideshare.entity.Trips;
import com.fasterxml.jackson.core.JacksonException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.geo.Point;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestClientResponseException;

import java.util.Map;

@Service
@Slf4j
public class RouteService {
    private final RestClient restClient;
    private final String googleApiKey;

    public  RouteService(RestClient.Builder restClientBuilder, @Value("${google.api.key}") String apiKey){
        this.restClient = restClientBuilder.build();
        this.googleApiKey = apiKey;
    }

    public RouteResponse calculateDistance(
            Double pickupLat,
            Double pickupLng,
            Double destLat,
            Double destLng
    ) {
        String googleUrl = "https://routes.googleapis.com/directions/v2:computeRoutes";

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
//            log.info("Route request response: {}",response);
//            return null;

        } catch (RestClientResponseException exception) {
            log.error("Google Routes error {}", exception.getResponseBodyAsString());

            throw new RuntimeException(
                    exception.getResponseBodyAsString(),
                    exception
            );
        } catch (RestClientException exception) {
            log.error("RestClient error while calling Google Routes", exception);
            throw new RuntimeException("Failed to call Google Routes", exception);
        }
    }

}
