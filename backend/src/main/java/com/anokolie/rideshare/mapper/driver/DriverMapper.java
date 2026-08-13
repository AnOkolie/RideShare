package com.anokolie.rideshare.mapper.driver;

import com.anokolie.rideshare.dto.driver.DriverObject;
import com.anokolie.rideshare.entity.DriverProfile;
import org.springframework.stereotype.Component;

@Component
public class DriverMapper {
    public DriverObject toResponse(DriverProfile driverProfile){
        DriverObject newResponse = new DriverObject();
        newResponse.setDriverOnboarding(driverProfile.getOnboarding());
        newResponse.setFullName(driverProfile.getUser().getFirstName() + " " + driverProfile.getUser().getLastName());
        newResponse.setStatus(driverProfile.getStatus());
//        newResponse.setLat(driverProfile.);
        return newResponse;
    }
}
