package com.anokolie.rideshare.dto.trips;

public record TripQuoteResponse (
        int estimatedDistanceMeters,
        int estimatedDurationSeconds,
        long estimatedFareCents){
}
