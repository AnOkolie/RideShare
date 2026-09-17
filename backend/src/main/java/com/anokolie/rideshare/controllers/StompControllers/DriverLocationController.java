package com.anokolie.rideshare.controllers.StompControllers;

import com.anokolie.rideshare.entity.DriverLocation;
import com.anokolie.rideshare.entity.Trips;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.service.RouteService;
import com.anokolie.rideshare.service.redis.DriverLocationCache;
import com.anokolie.rideshare.service.stomp.LocationUpdatesService;
import com.anokolie.rideshare.service.trips.TripService;
import com.anokolie.rideshare.service.user.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Controller;

import java.security.Principal;

import static java.lang.Math.max;

@Controller
@AllArgsConstructor
@Slf4j
public class DriverLocationController {
    private final DriverLocationCache driverLocationCache;
    private final UserService userService;
    private final LocationUpdatesService locationUpdatesService;
    private final DriverRepository driverRepository;

    @MessageMapping("/drivers/{driverId}/location")
    public void driverLocation(@DestinationVariable String driverId, Principal principal,
                               DriverLocation location){
        try{
            User user = userService.getUserFromPrincipal(principal);
            if (!user.getId().equals(Long.parseLong(driverId))) {
                log.warn("The users dont match User object id: " + user.getId() + " destinationVariable Id: " + Long.parseLong(driverId));
                throw new AccessDeniedException("Cannot publish for another driver");
            }
            boolean driverProfileExists = driverRepository.existsById(user.getId());

            if (!driverProfileExists) {
                throw new RuntimeException("No driver profile for user " + user.getId());
            }

            driverLocationCache.save(driverId, location);
        } catch (RuntimeException e) {
            log.warn("runtime exception is: " +e.getMessage());
        }
    }
    @MessageMapping("/driver/{driverId}/location/trip/{tripId}")
    public void driverToPickupUpdates(@DestinationVariable Long tripId, Principal principal,@DestinationVariable Long driverId, DriverLocation location){
        try{
            locationUpdatesService.DriverLocationService(tripId,principal,driverId,location);
        } catch (RuntimeException e) {
            log.warn("runtime exception is: " +e.getMessage());
        }
    }
}
