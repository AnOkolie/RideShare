package com.anokolie.rideshare.dto.rider;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Data
public class RiderObject {
    private Boolean riderOnboarding;
    private Integer totalTrips;
    private BigDecimal rating;
    private Long id;
    private String firstName;
    private String lastName;
    private String homeAddress;
    private String homePlaceId;
    private Double homeLatitude;
    private Double homeLongitude;
}
