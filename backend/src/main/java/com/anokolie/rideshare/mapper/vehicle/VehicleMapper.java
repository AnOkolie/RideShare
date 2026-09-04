package com.anokolie.rideshare.mapper.vehicle;

import com.anokolie.rideshare.dto.driver.DriverOnboardingRequest;
import com.anokolie.rideshare.dto.vehicle.VehicleResponse;
import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.entity.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class VehicleMapper {
    public VehicleResponse toResponse(Vehicle vehicle){
        VehicleResponse newResponse = new VehicleResponse();
        newResponse.setModel(vehicle.getModel());
        newResponse.setMake(vehicle.getMake());
        newResponse.setColor(vehicle.getColor());
        newResponse.setLicensePlate(vehicle.getLicensePlate());
        newResponse.setSeats(vehicle.getSeats());
        newResponse.setApproved(vehicle.getApproved());
        return newResponse;
    }

        public Vehicle toEntity(
                DriverOnboardingRequest.VehicleDetails request,
                DriverProfile driver
        ) {
            if (request.year() < 1886 || request.year() > 2100) {
                throw new IllegalArgumentException("Invalid vehicle year");
            }

            return Vehicle.builder()
                    .driver(driver)
                    .make(request.make())
                    .model(request.model())
                    .year(request.year().shortValue())
                    .color(request.colour())
                    .licensePlate(request.licensePlate())
                    .seats(request.seats())
                    .approved(false)
                    .build();
        }
}
