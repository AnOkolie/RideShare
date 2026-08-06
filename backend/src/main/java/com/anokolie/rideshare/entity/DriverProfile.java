package com.anokolie.rideshare.entity;

import com.anokolie.rideshare.enums.ApprovalStatus;
import com.anokolie.rideshare.enums.DriverStatus;
import jakarta.persistence.*;
import org.locationtech.jts.geom.Point;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="driver_profiles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DriverProfile {
    @Id
    private Long id;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus;
    @Enumerated(EnumType.STRING)
    private DriverStatus status;
    private String geohash;
    private LocalDateTime lastHeartbeat;
    private BigDecimal rating;
    private Integer totalTrips=0;
    @OneToMany(mappedBy="driver")
    private List<Vehicle> vehicles;
    @OneToMany(mappedBy="driver")
    private List<DriverDocument> documents;
    @Column(
            name="current_location",
            columnDefinition="POINT"
    )
    private Point currentLocation;
    private Boolean onboarding=false;
}