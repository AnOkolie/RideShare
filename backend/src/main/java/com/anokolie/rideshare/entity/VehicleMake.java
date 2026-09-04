package com.anokolie.rideshare.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class VehicleMake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(unique = true)
    private Integer vpicMakeId;

    private Boolean active = true;

    @OneToMany(mappedBy = "make")
    private List<VehicleModel> models = new ArrayList<>();
}