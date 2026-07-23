package com.anokolie.RideShare.model.tripEvents;


import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "trip_events")
public class TripEvents {
    @id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;
    @Getter @Setter @Column(nullable = false)
    private Long tripId;
    @Getter @Setter @Column(length = 20)
    private String from_status;
    @Getter @Setter @Column(length = 20)
    private String toStatus;
    @CreationTimestamp
    @Getter @Setter
    private LocalDateTime at;
}
