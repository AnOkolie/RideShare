package com.anokolie.rideshare.entity;

import com.anokolie.rideshare.enums.TripEventType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="trip_events")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TripEvent {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="trip_id")
    private Trip trip;
    @Enumerated(EnumType.STRING)
    private TripEventType eventType;
    @Column(columnDefinition="JSON")
    private String metadata;
    private LocalDateTime createdAt;
}