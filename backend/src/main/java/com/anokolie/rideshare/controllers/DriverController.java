package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.driver.DriverLocationUpdateRequest;
import com.anokolie.rideshare.dto.driver.DriverOnboardingRequest;
import com.anokolie.rideshare.dto.driver.DriverResponse;
import com.anokolie.rideshare.mapper.driver.DriverMapper;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.service.drivers.DriverLocationService;
import com.anokolie.rideshare.service.drivers.DriverService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class DriverController {
    private final DriverRepository driverRepository;
    private final DriverMapper driverMapper;
    private final DriverLocationService driverLocationService;
    private final DriverService driverService;

    @PatchMapping("/onboarding/driver/{id}")
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
    @PutMapping("/drivers/me/location")
    public ResponseEntity<Void> updateLocation(@RequestBody DriverLocationUpdateRequest location, @AuthenticationPrincipal Jwt jwt){
        driverLocationService.updateLocation(jwt.getSubject(),location);
        return ResponseEntity.ok().build();
    }
}
