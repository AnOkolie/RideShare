package com.anokolie.rideshare.dto.driver;

import jakarta.validation.constraints.NotNull;

public record DriverLocationUpdateRequest(
        @NotNull Double latitude,
        @NotNull Double longitude,
        Double accuracyMeters,
        Double heading
) {
}
