package com.anokolie.rideshare.service.drivers;

import com.anokolie.rideshare.dto.driver.DriverObject;
import com.anokolie.rideshare.model.drivers.Driver;
import com.anokolie.rideshare.model.drivers.status;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.util.GeometryUtil;

import java.util.List;

public class DriverService {
    private final DriverRepository repository;
    private final GeometryUtil geometryUtil;
    public DriverService(DriverRepository repository, GeometryUtil geometryUtil){
        this.repository = repository;
        this.geometryUtil = geometryUtil;
    }

    public Driver createDriver (DriverObject driver){
        Driver newDriver = new Driver();
        newDriver.setName(driver.getFullName());
        newDriver.setStatus(driver.getStatus());
        newDriver.setLocation(geometryUtil.createPoint(driver.getLat(),driver.getLng()));
        status status = driver.getStatus() != null ? driver.getStatus() : com.anokolie.rideshare.model.drivers.status.OFFLINE;
        newDriver.setStatus(status);
        return repository.save(newDriver);
    }

    public List<Driver> getAllDrivers () {
        return repository.findAll();
    }
    public Driver findDriverById(Long driverId){
        return repository.findById(driverId).orElse(null);
    }
    public void updateHeartbeat(DriverObject driver){
        Driver newDriver = new Driver();

    }
}
