package com.anokolie.RideShare.repository;

import com.anokolie.RideShare.model.drivers.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver,Long> {
}
