package com.anokolie.rideshare.service.trips;

import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.repository.DriverRepository;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class Driver {
    private final DriverRepository driverRepository;
    public void matchDriver(){
        List<DriverProfile> drivers = driverRepository.findMatchingDrivers();
        if(drivers.isEmpty()){

        }
    }
}
