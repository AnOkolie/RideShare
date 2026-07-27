package com.anokolie.rideshare.controllers.drivers;

import com.anokolie.rideshare.service.drivers.DriverService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.anokolie.rideshare.dto.driver.DriverObject;
import com.anokolie.rideshare.model.drivers.Driver;
@RequestMapping("/api/drivers")
public class Drivers {
    private final DriverService service;
    public Drivers(DriverService service){
        this.service = service;
    }
    public Driver createDriver (@RequestBody DriverObject driver){
        return service.createDriver(driver);
    }
    @PostMapping("/{id}/heartbeat")
    public void updateHeartbeat(@RequestBody DriverObject driver){
        service.updateHeartbeat(driver);
    }

}
