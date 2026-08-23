package com.anokolie.rideshare.entity;

import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;

@Entity
@Table(name = "driver_locations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DriverLocation extends BaseEntity{
    @Id @GeneratedValue
    private Long id;
    @OneToOne(optional = false)
    @MapsId
    @JoinColumn(name = "id")
    private DriverProfile driver;
    private Double latitude;
    private Double longitude;
    private Double accuracyMeters;
    private Double heading;
}
