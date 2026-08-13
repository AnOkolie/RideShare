package com.anokolie.rideshare.dto.driver;
import com.anokolie.rideshare.enums.DriverStatus;
import com.anokolie.rideshare.model.drivers.status;
import lombok.Getter;
import lombok.Setter;

public class DriverObject {
    @Getter @Setter
    private String fullName;
    @Getter @Setter
    private double lat;
    @Getter @Setter
    private double lng;
    @Getter @Setter
    private DriverStatus status;
    @Getter @Setter
    private Boolean driverOnboarding;
}
