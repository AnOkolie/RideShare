package com.anokolie.rideshare.service.drivers;

import com.anokolie.rideshare.dto.driver.DriverObject;
import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.enums.DriverStatus;
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

    public DriverProfile createDriver (DriverObject driver){
        DriverProfile newDriver = new DriverProfile();
        newDriver.setCurrentLocation(geometryUtil.createPoint(driver.getLat(),driver.getLng()));
        DriverStatus status = driver.getStatus() != null ? driver.getStatus() : DriverStatus.OFFLINE;
        newDriver.setStatus(status);
        return repository.save(newDriver);
    }

    public List<DriverProfile> getAllDrivers () {
        return repository.findAll();
    }
    public DriverProfile findDriverById(Long driverId){
        return repository.findById(driverId).orElse(null);
    }
    public void updateHeartbeat(DriverObject driver){
        Driver newDriver = new Driver();

    }
}
