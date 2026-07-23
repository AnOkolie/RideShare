package com.anokolie.RideShare.model.trips;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;


@Entity
@Table(name = "trips")
public class Trips {
    @id @GeneratedValue(strategy = GenerationType.IDENTITY) @Getter @Setter
    private Long id;
    @Getter @Setter @Column(nullable = false, name = "rider_id")
    private Long riderId;
    @Getter @Setter @Column(name = "driver_id")
    private Long driverId;
    @Getter @Setter @Column(nullable = false)
    private Status status;
    @Getter @Setter @Column(name = "pickup_lat")
    private double pickupLat;
    @Getter @Setter @Column(name="pickup_lng")
    private double pickupLng;
    @Getter @Setter @Column(name = "dest_lat")
    private double destLat;
    @Getter @Setter @Column(name = "dest_lng")
    private double destLng;
    @Getter @Setter @Column(name = "price_cents")
    private int priceCents;
    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    @Getter @Setter
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    @Getter @Setter
    private LocalDateTime updatedAt;
}
