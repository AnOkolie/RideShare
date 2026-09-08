package com.anokolie.rideshare.dto.trips;

import com.anokolie.rideshare.entity.Trips;
import com.anokolie.rideshare.enums.TripStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

public record TripResponse(
        Long id,
        TripStatus status,
        String pickupAddress,
        Double pickupLatitude,
        Double pickupLongitude,
        String destinationAddress,
        Double destinationLatitude,
        Double destinationLongitude,
        Double estimatedDistanceMeters,
        Integer estimatedDurationSeconds,
        Double fareCents,
        LocalDateTime requestedAt,
        Long driverId
) {
    public static TripResponse from(Trips trip) {
        System.out.println("Trip response object " +trip);
        Point pickup = trip.getPickupLocation();
        Point destination = trip.getDestinationLocation();
        return new TripResponse(
                trip.getId(),
                trip.getStatus(),
                trip.getPickupAddress(),
                pickup.getY(),       // latitude
                pickup.getX(),       // longitude
                trip.getDestinationAddress(),
                destination.getY(),       // latitude
                destination.getX(),       // long
                trip.getEstimatedDistance(),
                trip.getEstimatedDuration(),
                trip.getFareCents(),
                trip.getRequestedAt(),
                trip.getDriver() != null ? trip.getDriver().getId() : null
        );
    }
}