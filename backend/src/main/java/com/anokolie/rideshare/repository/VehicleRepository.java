package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface VehicleRepository extends JpaRepository <Vehicle,Long>{
    @Query(value = "SELECT * from vehicles where driver_id= :driverId", nativeQuery = true)
    public Optional<Vehicle> findByDriverId(@Param("driverId")Long id);
}
