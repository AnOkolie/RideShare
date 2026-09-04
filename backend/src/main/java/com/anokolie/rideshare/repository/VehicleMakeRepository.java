package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.VehicleMake;
import com.anokolie.rideshare.entity.VehicleModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface VehicleMakeRepository extends JpaRepository<VehicleMake,Long> {
    Optional<VehicleMake> findByVpicMakeId(Integer vpicMakeId);
    @Query(value = "SELECT * from vehicle_make WHERE LOWER(name)=LOWER(:make)", nativeQuery = true)
    Optional<VehicleMake> findByMakeName(@Param("make")String make);

    boolean existsByVpicMakeId(Integer vpicMakeId);
}
