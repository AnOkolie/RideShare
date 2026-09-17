package com.anokolie.rideshare.dto.trips;

import com.anokolie.rideshare.enums.DriverArrivalStatus;

public record DriverArrival(
    DriverArrivalStatus status
) {
}
