package com.anokolie.rideshare.dto.trips;

public record CreateTripRequest(
        Long tripId,
        String pickupAddress,
        double pickupLatitude,
        double pickupLongitude,
        String destinationAddress,
        double destinationLatitude,
        double destinationLongitude
) {}