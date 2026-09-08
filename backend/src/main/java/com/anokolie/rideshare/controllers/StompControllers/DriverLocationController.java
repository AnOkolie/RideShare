package com.anokolie.rideshare.controllers.StompControllers;

import com.anokolie.rideshare.entity.DriverLocation;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.service.redis.DriverLocationCache;
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

@Controller
@AllArgsConstructor
@Slf4j
public class DriverLocationController {
    private final SimpMessagingTemplate messagingTemplate;
    private final DriverLocationCache driverLocationCache;
    private final UserService userService;
    private final DriverRepository driverRepository;

    @MessageMapping("/drivers/{driverId}/location")
    public void driverLocation(@DestinationVariable String driverId, Principal principal,
                               DriverLocation location){
        try{
            log.info("driverId: " + driverId + " location: " + location);
            JwtAuthenticationToken authentication =
                    (JwtAuthenticationToken) principal;

            Jwt jwt = authentication.getToken();
            String authenticatedUserId = jwt.getSubject();
            log.info(authenticatedUserId);
            User user = userService.findByCognitoSub(authenticatedUserId).orElseThrow(()-> new RuntimeException("No matching user"));
            log.info("authenticated user: " + user.getId());
            if (!user.getId().equals(Long.parseLong(driverId))) {
                log.warn("The users dont match User object id: " + user.getId() + " destinationVariable Id: " + Long.parseLong(driverId));
                throw new AccessDeniedException("Cannot publish for another driver");
            }
            log.info("Driver identity check passed for user {}", user.getId());

            boolean driverProfileExists = driverRepository.existsById(user.getId());

            if (!driverProfileExists) {
                throw new RuntimeException("No driver profile for user " + user.getId());
            }

            log.info("Driver profile confirmed; writing location to Redis");

            driverLocationCache.save(driverId, location);

            log.info("Location saved to Redis for driver {}", driverId);
        } catch (RuntimeException e) {
            log.warn("runtime exception is: " +e.getMessage());
        }
    }
}
