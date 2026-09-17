package com.anokolie.rideshare.service.stomp;

import com.anokolie.rideshare.dto.trips.DriverTripOfferResponse;
import com.anokolie.rideshare.dto.trips.TripResponse;
import com.anokolie.rideshare.entity.Trips;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.repository.TripRepository;
import com.anokolie.rideshare.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@AllArgsConstructor
@Slf4j
public class OfferDriverRideService {
    private final SimpMessagingTemplate messagingTemplate;
    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    public void offerRide(String driverId, DriverTripOfferResponse ride){
        log.info("Ride offer {}",driverId);
        messagingTemplate.convertAndSendToUser(driverId,"/queue/ride-offers",ride);
    }
    public void rideAccepted(TripResponse tripResponse){
        Trips trip = tripRepository.findById(tripResponse.id()).orElseThrow(()-> new RuntimeException("This trip doesnt exist"));
        User rider = userRepository.findById(trip.getRider().getUser().getId()).orElseThrow(()-> new RuntimeException("There is no matching rider"));
        messagingTemplate.convertAndSendToUser(rider.getCognitoSub(),"/queue/ride-accepted",tripResponse);
    }
}
