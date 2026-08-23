package com.anokolie.rideshare.dto.trips;

import com.anokolie.rideshare.entity.Trips;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

public record TripResponse(
        @NotNull  Long riderId,
        @NotBlank String status,
        @NotBlank String pickupAddress,
        @NotNull Double pickupLatitude,
        @NotNull Double pickupLongitude,
        @NotBlank String destinationAddress,
        @NotNull Double destinationLatitude,
        @NotNull Double destinationLongitude,
        @NotNull Double estimatedDistance,
        @NotNull Integer estimatedDuration,
        @NotNull Integer fareCents,
        @NotNull LocalDateTime requestedAt
) {
    public static TripResponse from(Trips trip) {
        System.out.println("Trip response object " +trip);
        Point pickup = trip.getPickupLocation();
        Point destination = trip.getDestinationLocation();
        return new TripResponse(
                trip.getId(),
                trip.getStatus().name(),
                trip.getPickupAddress(),
                pickup.getY(),       // latitude
                pickup.getX(),       // longitude
                trip.getDestinationAddress(),
                destination.getY(),       // latitude
                destination.getX(),       // long
                trip.getEstimatedDistance(),
                trip.getEstimatedDuration(),
                trip.getFareCents(),
                trip.getRequestedAt()
//                trip.getDriver() != null ? trip.getDriver().getId() : null
        );
    }
}