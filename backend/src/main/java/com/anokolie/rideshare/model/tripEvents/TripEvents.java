package com.anokolie.rideshare.model.tripEvents;


import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import jakarta.persistence.Id;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;


@Table(name = "trip_events")
public class TripEvents {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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
