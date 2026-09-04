package com.anokolie.rideshare.service.vehicle;

import com.anokolie.rideshare.dto.vehicle.*;
import com.anokolie.rideshare.entity.VehicleMake;
import com.anokolie.rideshare.entity.VehicleModel;
import com.anokolie.rideshare.repository.VehicleMakeRepository;
import com.anokolie.rideshare.repository.VehicleModelRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleCatalogImportService {

    private final VpicClient vpicClient;

    private final VehicleMakeRepository vehicleMakeRepository;
    private final VehicleModelRepository vehicleModelRepository;


    @Transactional
    public void importMakes() {

        VpicMakesResponse response =
                vpicClient.getAllMakes();
        for (VpicMakeDto vpicMake : response.Results()) {
            boolean alreadyExists =
                    vehicleMakeRepository
                            .existsByVpicMakeId(
                                    vpicMake.makeId()
                            );
            if (alreadyExists) {
                continue;
            }
            VehicleMake make = new VehicleMake();
            make.setName(vpicMake.makeName());
            make.setVpicMakeId(
                    vpicMake.makeId()
            );
            vehicleMakeRepository.save(make);
        }
    }


    @Transactional
    public void importModels(VehicleMake make) {
        VpicModelsResponse response =
                vpicClient.getModelsForMake(
                        make.getVpicMakeId()
                );
        for (VpicModelDto dto : response.Results()) {
            VehicleModel model = new VehicleModel();
            model.setName(dto.modelName());
            model.setVpicModelId(
                    dto.modelId()
            );
            model.setMake(make);
            vehicleModelRepository.save(model);
        }
    }

    public List<VpicMakeDto> getMake(){
         List<VehicleMake> makes = vehicleMakeRepository.findAll();
         List<VpicMakeDto> response = new ArrayList<>();
         for(VehicleMake make : makes){
             VpicMakeDto newMake = new VpicMakeDto(
                     make.getVpicMakeId(),
                     make.getName()
             );
             response.add(newMake);
         }
         return response;
    }

    public List<VehicleModelDto> getModel(String make){
        VehicleMake vehicleMake = vehicleMakeRepository.findByMakeName(make).orElseThrow(() -> new RuntimeException("Error finding matching vehicle"));
        List <VehicleModel> modelList =  vehicleMake.getModels();
        if(modelList.isEmpty()){
            importModels(vehicleMake);
            modelList = vehicleMake.getModels();
        }
        List<VehicleModelDto> response = new ArrayList<>();
        for(VehicleModel model : modelList){
            VehicleModelDto newModel = new VehicleModelDto(
                    make,
                    model.getName()
            );
            response.add(newModel);
        }
        return response;
    }
}
