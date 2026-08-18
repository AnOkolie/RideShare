package com.anokolie.rideshare.dto.trips;

import com.anokolie.rideshare.entity.Trip;

import java.time.LocalDateTime;

public record TripResponse(
        Long id,
        String status,
        String pickupAddress,
        String destinationAddress,
        Double estimatedDistance,
        Integer estimatedDuration,
        Integer fareCents,
        LocalDateTime requestedAt,
        Long driverId
) {
    public static TripResponse from(Trip trip) {
        return new TripResponse(
                trip.getId(),
                trip.getStatus().name(),
                trip.getPickupAddress(),
                trip.getDestinationAddress(),
                trip.getEstimatedDistance(),
                trip.getEstimatedDuration(),
                trip.getFareCents(),
                trip.getRequestedAt(),
                trip.getDriver() != null ? trip.getDriver().getId() : null
        );
    }
}