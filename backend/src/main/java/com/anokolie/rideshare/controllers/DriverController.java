package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.driver.DriverObject;
import com.anokolie.rideshare.dto.rider.RiderObject;
import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.entity.RiderProfile;
import com.anokolie.rideshare.mapper.driver.DriverMapper;
import com.anokolie.rideshare.repository.DriverRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/onboarding")
public class DriverController {
    private final DriverRepository driverRepository;
    private final DriverMapper driverMapper;

    public DriverController(DriverRepository driverRepository, DriverMapper driverMapper){
        this.driverRepository = driverRepository;
        this.driverMapper = driverMapper;
    }

    @PatchMapping("/driver/{id}")
    public ResponseEntity<DriverProfile> updateOnboardingState(@PathVariable("id") Long id, @RequestBody String status){
        Optional<DriverProfile> driverOptional = driverRepository.findById(id);
        if(driverOptional.isPresent()){
            DriverProfile driverProfile = driverOptional.get();
            driverProfile.setOnboarding(true);
            return ResponseEntity.ok(driverProfile);
        }else{
            DriverProfile driver = new DriverProfile();
            driver.setOnboarding(true);
//            driver.setUserId(id);
            driver.setTotalTrips(0);
            driverRepository.save(driver);
            return ResponseEntity.status(HttpStatus.CREATED).body(driver);
        }
}
    @GetMapping("/driver/state/{id}")
    public ResponseEntity<DriverObject> completedRiderOnboarding (@PathVariable("id") Long id){
        Optional <DriverProfile> riderOptional= driverRepository.findById(id);
        if(riderOptional.isPresent()){
            DriverObject rider = driverMapper.toResponse(riderOptional.get());
            return ResponseEntity.ok().body(rider);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
