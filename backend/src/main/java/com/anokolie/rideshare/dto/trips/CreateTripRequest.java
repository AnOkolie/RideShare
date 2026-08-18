package com.anokolie.rideshare.dto.trips;

public record CreateTripRequest(
        String pickupAddress,
        double pickupLatitude,
        double pickupLongitude,
        String destinationAddress,
        double destinationLatitude,
        double destinationLongitude
) {}