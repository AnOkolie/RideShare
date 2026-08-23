package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.rider.RiderObject;
import com.anokolie.rideshare.dto.rider.RiderUpdate;
import com.anokolie.rideshare.mapper.rider.RiderMapper;
import com.anokolie.rideshare.repository.RiderRepository;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.riders.RiderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/rider")
@AllArgsConstructor
public class RiderController {
    private final RiderRepository riderRepository;
    private final UserRepository userRepository;
    private final RiderMapper riderMapper;
    private final RiderService riderService;

    @PatchMapping("/update/{id}")
    public ResponseEntity<Map<String,Object>> updateRiderProfile(@PathVariable ("id") Long id, @RequestBody RiderUpdate rider){
        System.out.println("rider update: " + id + " " + rider.toString());
        try{
            Map<String,Object> resp = riderService.updateUserWithRider(id,rider);
            return ResponseEntity.ok().body(resp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
