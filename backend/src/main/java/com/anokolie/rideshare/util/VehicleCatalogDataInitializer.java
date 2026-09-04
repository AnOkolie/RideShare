package com.anokolie.rideshare.util;

import com.anokolie.rideshare.repository.VehicleMakeRepository;
import com.anokolie.rideshare.repository.VehicleModelRepository;
import com.anokolie.rideshare.service.vehicle.VehicleCatalogImportService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
@RequiredArgsConstructor
public class VehicleCatalogDataInitializer
        implements ApplicationRunner {

    private final VehicleCatalogImportService importService;

    private final VehicleMakeRepository vehicleMakeRepository;

    @Override
    public void run(ApplicationArguments args) {

        if (vehicleMakeRepository.count() > 0) {

            System.out.println(
                    "Vehicle catalog already exists. Skipping import."
            );

            return;
        }

        System.out.println(
                "Importing vehicle catalog..."
        );

        importService.importMakes();

        System.out.println(
                "Vehicle catalog import complete."
        );
    }
}