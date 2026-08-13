package com.anokolie.rideshare.dto.rider;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class RiderObject {
    private Boolean riderOnboarding;
    private Integer totalTrips;
    private BigDecimal rating;
    private Long id;
    private String firstName;
    private String lastName;
}
