package com.anokolie.rideshare.service.vehicle;

import com.anokolie.rideshare.dto.vehicle.VehicleResponse;
import com.anokolie.rideshare.entity.Vehicle;
import com.anokolie.rideshare.mapper.vehicle.VehicleMapper;
import com.anokolie.rideshare.repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    private final VehicleMapper vehicleMapper;
    public VehicleResponse getVehicle(Long id){
        Vehicle v = vehicleRepository.findByDriverId(id).orElseThrow(()->new RuntimeException("No vehicle found for this user"));
        return vehicleMapper.toResponse(v);
    }
    public Vehicle createVehicle(Vehicle vehicle){
        return vehicleRepository.save(vehicle);
    }
}
