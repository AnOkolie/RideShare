package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.model.drivers.Driver;
import com.anokolie.rideshare.model.trips.Trips;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TripRepository extends JpaRepository<Trips, Long> {
    @Query(value = """
 SELECT * FROM drivers
WHERE ST_Distance_Sphere(location, ST_SRID(POINT(:lng,:lat),4326)) < :radius
""", nativeQuery = true)
    List<Driver> findMatchingDrivers (double lng, double lat, double radius);
}
