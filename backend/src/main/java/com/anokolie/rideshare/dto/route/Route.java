package com.anokolie.rideshare.dto.route;

public record Route(
        Double distanceMeters,
        String duration,
        Polyline polyline
) {
}