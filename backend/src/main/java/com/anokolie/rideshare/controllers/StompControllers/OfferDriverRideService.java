package com.anokolie.rideshare.controllers.StompControllers;

import com.anokolie.rideshare.dto.trips.DriverTripOfferResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
@Slf4j
public class OfferDriverRideController {
    private final SimpMessagingTemplate messagingTemplate;
    public void offerRide(String driverId, DriverTripOfferResponse ride){
        log.info("Ride offer {}",driverId);
        messagingTemplate.convertAndSendToUser(driverId,"/queue/ride-offers",ride);
    }
}
