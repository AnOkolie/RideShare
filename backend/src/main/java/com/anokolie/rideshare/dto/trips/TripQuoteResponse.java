package com.anokolie.rideshare.dto.trips;

public record TripQuoteResponse (
        Double estimatedDistanceMeters,
        Integer estimatedDurationSeconds,
        Double estimatedFareCents){
}
