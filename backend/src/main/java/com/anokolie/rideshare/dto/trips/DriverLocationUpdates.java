package com.anokolie.rideshare.dto.trips;

public record DriverLocationUpdates (
        Double longitude,
        Double latitude,
        String eta
) {
}
