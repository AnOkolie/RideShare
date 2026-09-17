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
@RequestMapping("/api/drivers")
@AllArgsConstructor
public class DriverController {
    private final DriverRepository driverRepository;
    private final DriverMapper driverMapper;
    private final DriverLocationService driverLocationService;
    private final DriverService driverService;

    @PutMapping("/me/location")
    public ResponseEntity<Void> updateLocation(@RequestBody DriverLocationUpdateRequest location, @AuthenticationPrincipal Jwt jwt){
        driverLocationService.updateLocation(jwt.getSubject(),location);
        return ResponseEntity.ok().build();
    }
}
