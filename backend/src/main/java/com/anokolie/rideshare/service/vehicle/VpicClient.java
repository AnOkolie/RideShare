package com.anokolie.rideshare.service.vehicle;

import com.anokolie.rideshare.dto.vehicle.VpicMakesResponse;
import com.anokolie.rideshare.dto.vehicle.VpicModelsResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class VpicClient {

    private final RestClient restClient;


    public VpicClient() {
        this.restClient = RestClient.builder()
                .baseUrl("https://vpic.nhtsa.dot.gov/api")
                .build();
    }

    public VpicMakesResponse getAllMakes() {

        return restClient.get()
                .uri("/vehicles/GetMakesForVehicleType/car?format=json")
                .retrieve()
                .body(VpicMakesResponse.class);
    }

    public VpicModelsResponse getModelsForMake(Integer vpicMakeId) {
        return restClient.get()
                .uri(
                        "/vehicles/GetModelsForMakeId/{makeId}?format=json",
                        vpicMakeId
                )
                .retrieve()
                .body(VpicModelsResponse.class);
    }
}