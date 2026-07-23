package com.anokolie.RideShare.repository;

import com.anokolie.RideShare.model.trips.Trips;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trips, Long> {
}
