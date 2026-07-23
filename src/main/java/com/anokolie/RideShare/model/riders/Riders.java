package com.anokolie.RideShare.model.riders;


import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Table(name = "riders")
public class Riders {
    @id @Getter @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Getter @Setter @Column(length = 100)
    private String name;
}
