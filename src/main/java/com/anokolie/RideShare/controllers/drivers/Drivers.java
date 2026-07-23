package com.anokolie.RideShare.controllers.drivers;

import com.anokolie.RideShare.service.drivers.DriverService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.anokolie.RideShare.dto.driver.DriverObject;
@RequestMapping("/api/drivers")
public class Drivers {
    private final DriverService service;
    public Drivers(DriverService service){
        this.service = service;
    }
    public DriverObject createDriver (@RequestBody DriverObject driver){
        return service.createDriver(driver);
    }
    @PostMapping("/{id}/heartbeat")
    public void updateHeartbeat(@RequestBody DriverObject driver){
        service.updateHeartbeat(driver);
    }

}
