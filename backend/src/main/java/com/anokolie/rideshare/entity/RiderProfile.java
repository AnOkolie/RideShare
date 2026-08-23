package com.anokolie.rideshare.entity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "rider_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RiderProfile extends BaseEntity {

    @Id
    private Long id;

    @OneToOne(optional = false)
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private BigDecimal rating;
    private Integer totalTrips = 0;
    private Boolean onboarding = false;
    private String homeAddress;
}