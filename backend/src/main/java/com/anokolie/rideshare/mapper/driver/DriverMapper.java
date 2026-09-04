package com.anokolie.rideshare.mapper.driver;

import com.anokolie.rideshare.dto.driver.DriverResponse;
import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.mapper.vehicle.VehicleMapper;
import com.anokolie.rideshare.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinates;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DriverMapper {

    private final LocationService locationService;
    private final VehicleMapper vehicleMapper;
    public DriverResponse toResponse(DriverProfile driver) {
        double lat = locationService.getLatitude(driver.getGeohash());
        double lng = locationService.getLongitude(driver.getGeohash());
        return new DriverResponse(
                driver.getUser().getFirstName() + " " +
                        driver.getUser().getLastName(),
                lat,
                lng,
                driver.getStatus(),
                driver.getOnboarding(),
                vehicleMapper.toResponse(driver.getVehicle())

        );
    }
}
