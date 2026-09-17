package com.anokolie.rideshare.service.drivers;

import com.anokolie.rideshare.dto.driver.DriverOnboardingRequest;
import com.anokolie.rideshare.dto.driver.DriverResponse;
import com.anokolie.rideshare.dto.vehicle.VehicleResponse;
import com.anokolie.rideshare.entity.DriverDocument;
import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.entity.Vehicle;
import com.anokolie.rideshare.enums.DriverStatus;
import com.anokolie.rideshare.mapper.driver.DriverMapper;
import com.anokolie.rideshare.mapper.driver_document.DriverDocumentMapper;
import com.anokolie.rideshare.mapper.vehicle.VehicleMapper;
import com.anokolie.rideshare.repository.DriverDocumentRepository;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.vehicle.VehicleService;
import com.anokolie.rideshare.util.GeometryUtil;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DriverService {
    private final DriverRepository repository;
    private final VehicleService vehicleService;
    private final GeometryUtil geometryUtil;
    private final DriverMapper driverMapper;
    private final VehicleMapper vehicleMapper;
    private final DriverDocumentMapper driverDocumentMapper;
    private final UserRepository userRepository;
    private final DriverDocumentRepository driverDocumentRepository;

    public List<DriverProfile> getAllDrivers () {
        return repository.findAll();
    }
    public DriverProfile findDriverById(Long driverId){
        return repository.findById(driverId).orElse(null);
    }
    public void updateHeartbeat(DriverResponse driver){
        DriverProfile newDriver = new DriverProfile();

    }

    public DriverResponse updateOnboardingState(Long id){
        try{
            DriverProfile driver = repository.findById(id).orElseThrow(()->new RuntimeException("Driver doesnt exist"));
            VehicleResponse vehicle = vehicleService.getVehicle(id);
            return driverMapper.toResponse(driver);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
    @Transactional
    public Map<String, Object> createDriver(
            Long id,
            DriverOnboardingRequest request
    ) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User does not exist"));

        Map<String, Object> response = new HashMap<>();

        Optional<DriverProfile> existingDriver = repository.findById(user.getId());

        if (existingDriver.isPresent()) {
            DriverProfile driver = existingDriver.get();

            // Update existing onboarding values here if appropriate.
            driver.setOnboarding(true);

            DriverResponse driverResponse =
                    driverMapper.toResponse(repository.save(driver));

            response.put("profile", driverResponse);
            response.put("status", 200);
            return response;
        }

        // 1. Create and persist the driver profile first.
        DriverProfile driver = new DriverProfile();
        driver.setUser(user); // @MapsId derives driver.id from user.id
        driver.setOnboarding(true);
        driver.setTotalTrips(0);

        DriverProfile savedDriver = repository.save(driver);

        // 2. Convert the vehicle request DTO to an entity.
        Vehicle vehicle = vehicleMapper.toEntity(
                request.vehicle(),
                savedDriver
        );

        // 3. Save vehicle. Its ID is derived from savedDriver due to @MapsId.
        Vehicle savedVehicle = vehicleService.createVehicle(vehicle);

        // Keep the in-memory relationship consistent.
        savedDriver.setVehicle(savedVehicle);

        // 4. Map and save uploaded-document entities here.
        // Each document must use an S3 key and be associated with savedDriver.
        //
         List<DriverDocument> documents =
             driverDocumentMapper.toEntities(request, savedDriver);
         driverDocumentRepository.saveAll(documents);
         savedDriver.setDocuments(documents);

        DriverResponse driverResponse = driverMapper.toResponse(savedDriver);

        response.put("profile", driverResponse);
        response.put("status", 201);

        return response;
    }
}
