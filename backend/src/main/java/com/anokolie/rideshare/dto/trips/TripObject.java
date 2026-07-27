package com.anokolie.rideshare.dto.trips;

import lombok.Getter;
import lombok.Setter;

public class TripObject {
    @Getter @Setter
    private Long riderId;
    @Getter @Setter
    private Long driverId;
    @Getter @Setter
    private double pickupLat;
    @Getter @Setter
    private double pickupLng;
    @Getter @Setter
    private double destLat;
    @Getter @Setter
    private double destLng;
}
