package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.VehicleMake;
import com.anokolie.rideshare.entity.VehicleModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleModelRepository extends JpaRepository<VehicleModel,Long> {
    Optional<VehicleModel> findByVpicModelId(Integer vpicModelId);
    boolean existsByVpicModelId(Integer vpicModelId);
}