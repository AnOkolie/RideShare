package com.anokolie.rideshare.entity;

import com.anokolie.rideshare.enums.TripStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="trips")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trip extends BaseEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="rider_id",referencedColumnName="userId")
    private RiderProfile rider;
    @ManyToOne
    @JoinColumn(name="driver_id",referencedColumnName="user_id")
    private DriverProfile driver;
    @Enumerated(EnumType.STRING)
    private TripStatus status;
    private String pickupAddress;
    private String destinationAddress;
    private Double estimatedDistance;
    private Integer estimatedDuration;
    private Double actualDistance;
    private Integer actualDuration;
    private Integer fareCents;
    private Integer tipCents;
    private LocalDateTime requestedAt;
    private LocalDateTime acceptedAt;
    private LocalDateTime arrivedAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private LocalDateTime cancelledAt;
    @OneToMany(mappedBy="trip",
            cascade=CascadeType.ALL)
    private List<TripEvent> events;
    @OneToOne(mappedBy="trip")
    private Payment payment;

}