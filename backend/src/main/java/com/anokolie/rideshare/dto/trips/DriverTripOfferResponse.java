package com.anokolie.rideshare.dto.trips;

public record DriverTripOfferResponse(
        Long tripId,
        String pickupAddress,
        String destinationAddress,
        Integer estimatedDistanceMeters,
        Integer estimatedDurationSeconds,
        Long estimatedFareCents
) {}
