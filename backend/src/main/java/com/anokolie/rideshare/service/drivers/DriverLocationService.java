package com.anokolie.rideshare.service.drivers;

import com.anokolie.rideshare.model.drivers.Driver;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.util.GeometryUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DriverLocationService {

    private final DriverRepository driverRepository;
    private final GeometryUtil geometryUtil;


    @Transactional
    public void updateLocation(
            Long driverId,
            double latitude,
            double longitude
    ) {

        Driver driver = driverRepository
                .findById(driverId)
                .orElseThrow(
                        () -> new RuntimeException("Driver not found")
                );


        Point point = geometryUtil.createPoint(
                latitude,
                longitude
        );


        driver.setLocation(point);

        driverRepository.save(driver);
    }
}