package com.anokolie.rideshare.controllers;


import com.anokolie.rideshare.dto.driver.DriverOnboardingRequest;
import com.anokolie.rideshare.dto.driver.DriverResponse;
import com.anokolie.rideshare.dto.rider.RiderObject;
import com.anokolie.rideshare.dto.rider.RiderOnboardingRequest;
import com.anokolie.rideshare.entity.RiderProfile;
import com.anokolie.rideshare.mapper.rider.RiderMapper;
import com.anokolie.rideshare.repository.RiderRepository;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.drivers.DriverService;
import com.anokolie.rideshare.service.riders.RiderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/onboarding")
@AllArgsConstructor
public class OnboardingController {
    private final RiderRepository riderRepository;
    private final UserRepository userRepository;
    private final RiderMapper riderMapper;
    private final RiderService riderService;
    private final DriverService driverService;

    @PatchMapping("/rider/{id}")
    public ResponseEntity<RiderObject> updateRiderOnboardingState(
            @PathVariable Long id, @RequestBody RiderOnboardingRequest request
            ) {
        try{
            return ResponseEntity.ok().body(riderService.createRider(id,request));
        }catch(Exception e){
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PatchMapping("/driver/{id}")
    public ResponseEntity<DriverResponse> createDriverProfile(@PathVariable("id") Long id, @RequestBody DriverOnboardingRequest request){
        try{
            Map<String,Object> response = driverService.createDriver(id,request);
            if(response.containsKey("status") && response.containsKey("profile"))
            {
                DriverResponse driver =  (DriverResponse)response.get("profile");
                int status = (int)response.get("status");
                return ResponseEntity.status(status).body(driver);
            }
            throw new RuntimeException();
        }catch (RuntimeException e){
            System.out.println("Runtime error: "+e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/rider/state/{id}")
    public ResponseEntity<RiderObject> completedRiderOnboarding (@PathVariable("id") Long id){
        Optional<RiderProfile> riderOptional= riderRepository.findById(id);
        if(riderOptional.isPresent()){
            RiderObject rider = riderMapper.toResponse(riderOptional.get());
            return ResponseEntity.ok().body(rider);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
    @GetMapping("/driver/state/{id}")
    public ResponseEntity<DriverResponse> completedDriverOnboarding (@PathVariable("id") Long id){
        try{
            DriverResponse driver = driverService.updateOnboardingState(id);
            return ResponseEntity.ok().body(driver);
        }catch(RuntimeException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
