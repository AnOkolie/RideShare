package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.DriverProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DriverRepository extends JpaRepository<DriverProfile,Long> {

    @Query(value = "SELECT * FROM driver_profiles WHERE status='ONLINE' AND approvalStatus='Approved'", nativeQuery = true)
    public List<DriverProfile> findMatchingDrivers();
}