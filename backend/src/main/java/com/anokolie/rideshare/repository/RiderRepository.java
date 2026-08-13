package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.RiderProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RiderRepository extends JpaRepository<RiderProfile,Long> {
}
