package com.anokolie.rideshare.dto.trips;

public record TripRequest(
        TripQuoteResponse fare,
        CreateTripRequest trip
) {
}
