package com.anokolie.rideshare.entity;
import com.anokolie.rideshare.enums.VehicleType;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name="vehicles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle extends BaseEntity {


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name="driver_id")
    private DriverProfile driver;



    private String make;

    private String model;

    private Short year;

    private String color;

    private String licensePlate;

    private Integer seats;



    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;


    private Boolean approved;
}