package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.DriverProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<DriverProfile,Long> {

}