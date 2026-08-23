package com.anokolie.rideshare.controllers;


import com.anokolie.rideshare.dto.rider.RiderObject;
import com.anokolie.rideshare.entity.RiderProfile;
import com.anokolie.rideshare.mapper.rider.RiderMapper;
import com.anokolie.rideshare.repository.RiderRepository;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.riders.RiderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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

    @PatchMapping("/rider/{id}")
    public ResponseEntity<RiderObject> updateRiderOnboardingState(
            @PathVariable Long id
    ) {
        try{
            return ResponseEntity.ok().body(riderService.updateOnboardingState(id));
        }catch(Exception e){
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
}
