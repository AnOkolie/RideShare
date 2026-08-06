package com.anokolie.rideshare.entity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name="rider_profiles")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RiderProfile {
    @Id
    private Long userId;
    @OneToOne
    @JoinColumn(name="id")
    private User user;
    private BigDecimal rating;
    private Integer totalTrips=0;
    private Boolean onboarding = false;
}