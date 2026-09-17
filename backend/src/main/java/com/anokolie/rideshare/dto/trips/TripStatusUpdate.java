package com.anokolie.rideshare.dto.trips;

import com.anokolie.rideshare.enums.TripStatus;

public record TripStatusUpdate(
        Long tripId,
        TripStatus status
){
}
