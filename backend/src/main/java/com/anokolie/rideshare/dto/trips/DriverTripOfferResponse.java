package com.anokolie.rideshare.dto.trips;

public record DriverTripOfferResponse(
        Long tripId,
        String pickupAddress,
        String destinationAddress,
        Double estimatedDistanceMeters,
        Integer estimatedDurationSeconds,
        Integer estimatedFareCents
) {}
