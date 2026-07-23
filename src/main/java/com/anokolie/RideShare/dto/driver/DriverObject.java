package com.anokolie.RideShare.dto.driver;
import com.anokolie.RideShare.model.drivers.status;
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
    private status status;
}
