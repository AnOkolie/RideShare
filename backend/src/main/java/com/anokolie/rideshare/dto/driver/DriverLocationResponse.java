package com.anokolie.rideshare.dto.driver;

import java.time.LocalDateTime;

public record DriverLocationResponse(
        Long tripId,
        Double latitude,
        Double longitude,
        LocalDateTime updatedAt
) {
}
