package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.vehicle.VehicleModelDto;
import com.anokolie.rideshare.dto.vehicle.VpicMakeDto;
import com.anokolie.rideshare.service.vehicle.VehicleCatalogImportService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicle")
@AllArgsConstructor
public class VehicleController {

    private final VehicleCatalogImportService importService;

    @GetMapping("/makes")
    public ResponseEntity<List<VpicMakeDto>> getMakes(){
        return ResponseEntity.ok().body(importService.getMake());
    }

    @GetMapping("/models")
    public ResponseEntity<List<VehicleModelDto>> getModels(@RequestParam String make){
        try{
            return ResponseEntity.ok().body(importService.getModel(make));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
