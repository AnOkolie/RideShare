package com.anokolie.RideShare.service.drivers;

import com.anokolie.RideShare.dto.driver.DriverObject;
import com.anokolie.RideShare.model.drivers.Driver;
import com.anokolie.RideShare.repository.DriverRepository;

import java.util.List;

public class DriverService {
    private final DriverRepository repository;
    public DriverService(DriverRepository repository){
        this.repository = repository;
    }

    public DriverObject createDriver (DriverObject driver){
        Driver newDriver = new Driver();
        newDriver.setName(driver.getFullName());
        newDriver.setStatus(driver.getStatus());
        newDriver.setLocation();

        return repository.save(driver);
    }

    public List<DriverObject> getAllDrivers () {
        return repository.findAll();
    }
    public DriverObject findDriverById(Long driverId){
        return repository.findById(driverId).orElse(null);
    }
    public void updateHeartbeat(DriverObject driver){
        Driver newDriver = new Driver();

    }
}
