package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.DriverLocation;
import com.anokolie.rideshare.entity.Trips;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DriverLocationRepository extends JpaRepository<DriverLocation,Long> {
    @Query(value = "SELECT * from trips WHERE status='ACCEPTED' AND driver_id=$1", nativeQuery = true)
    public Trips findActiveTripByDriverId(String driver);
}
