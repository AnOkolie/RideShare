package com.anokolie.rideshare.dto.driver;
import com.anokolie.rideshare.enums.DriverStatus;

public record DriverResponse (
         String fullName,
         double lat,
         double lng,
         DriverStatus status,
         Boolean driverOnboarding
){
}