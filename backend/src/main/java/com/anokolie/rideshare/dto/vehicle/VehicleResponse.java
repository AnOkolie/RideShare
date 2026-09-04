package com.anokolie.rideshare.dto.vehicle;

import com.anokolie.rideshare.enums.VehicleType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data @Getter @Setter
public class VehicleResponse {
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
