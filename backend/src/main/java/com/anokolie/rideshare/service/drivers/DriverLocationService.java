package com.anokolie.rideshare.service.drivers;

import com.anokolie.rideshare.dto.driver.DriverLocationResponse;
import com.anokolie.rideshare.dto.driver.DriverLocationUpdateRequest;
import com.anokolie.rideshare.entity.DriverLocation;
import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.repository.DriverLocationRepository;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.repository.TripRepository;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.util.GeometryUtil;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DriverLocationService {

    private final DriverRepository driverRepository;
    private final TripRepository tripRepository;
    private final DriverLocationRepository locationRepository;
    private final UserRepository userRepository;
    private final GeometryUtil geometryUtil;
    private final SimpMessagingTemplate messagingTemplate;


    @Transactional
    public void updateLocation(
            String cognitoSub, DriverLocationUpdateRequest updateLocation
    ) {
        User user = userRepository.findByCognitoSub(cognitoSub).orElseThrow(()-> new RuntimeException("User not found"));
        DriverProfile driver = driverRepository.findById(user.getId()).orElseThrow(() -> new RuntimeException("Driver not found"));
        Point point = geometryUtil.createPoint(
                updateLocation.latitude(),
                updateLocation.longitude());
        DriverLocation location = locationRepository.findById(driver.getId())
                .orElseGet(DriverLocation::new);

        location.setDriver(driver);
        location.setLatitude(updateLocation.latitude());
        location.setLongitude(updateLocation.longitude());
        location.setAccuracyMeters(updateLocation.accuracyMeters());
        location.setHeading(updateLocation.heading());
        location.setUpdatedAt(LocalDateTime.now());
        tripRepository.findActiveTripByDriverId(driver.getId())
                .ifPresent(trip -> {
                    DriverLocationResponse response = new DriverLocationResponse(
                            trip.getId(),
                            updateLocation.latitude(),
                            updateLocation.longitude(),
                            location.getUpdatedAt()
                    );

                    messagingTemplate.convertAndSend(
                            "/topic/trips/" + trip.getId() + "/driver-location",
                            response
                    );
                });
        locationRepository.save(location);
        driver.setCurrentLocation(point);
        driverRepository.save(driver);
    }
}