package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.rider.RiderObject;
import com.anokolie.rideshare.entity.RiderProfile;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.mapper.rider.RiderMapper;
import com.anokolie.rideshare.repository.RiderRepository;
import com.anokolie.rideshare.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/onboarding")
public class RiderController {
    private final RiderRepository riderRepository;
    private final UserRepository userRepository;
    private final RiderMapper riderMapper;
    public RiderController(RiderRepository riderRepository, UserRepository userRepository, RiderMapper riderMapper){
        this.riderRepository = riderRepository;
        this.userRepository = userRepository;
        this.riderMapper = riderMapper;
    }

    @PatchMapping("/rider/{id}")
    public ResponseEntity<RiderProfile> updateOnboardingState(
            @PathVariable Long id
    ) {
        return riderRepository.findById(id)
                .map(rider -> {
                    rider.setOnboarding(true);
                    return ResponseEntity.ok(riderRepository.save(rider));
                })
                .orElseGet(() -> userRepository.findById(id)
                        .map(user -> {
                            RiderProfile rider = new RiderProfile();
                            rider.setUser(user); // required: establishes rider.id via @MapsId
                            rider.setOnboarding(true);
                            rider.setRating(BigDecimal.ZERO);
                            rider.setTotalTrips(0);

                            return ResponseEntity
                                    .status(HttpStatus.CREATED)
                                    .body(riderRepository.save(rider));
                        })
                        .orElseGet(() -> ResponseEntity.notFound().build()));
    }

    @GetMapping("/rider/state/{id}")
    public ResponseEntity<RiderObject> completedRiderOnboarding (@PathVariable("id") Long id){
        Optional <RiderProfile> riderOptional= riderRepository.findById(id);
        if(riderOptional.isPresent()){
            RiderObject rider = riderMapper.toResponse(riderOptional.get());
            return ResponseEntity.ok().body(rider);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}
