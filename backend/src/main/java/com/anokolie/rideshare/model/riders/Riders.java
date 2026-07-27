package com.anokolie.rideshare.model.riders;


import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Table(name = "riders")
public class Riders {
    @Id @Getter @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Getter @Setter @Column(length = 100)
    private String name;
}
