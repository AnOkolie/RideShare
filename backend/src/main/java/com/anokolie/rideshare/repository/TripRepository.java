package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.entity.Trips;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TripRepository extends JpaRepository<Trips, Long> {
    @Query(value = """
 SELECT * FROM driver_profiles
WHERE ST_Distance_Sphere(location, ST_SRID(POINT(:lng,:lat),4326)) < :radius
""", nativeQuery = true)
    List<DriverProfile> findMatchingDrivers (double lng, double lat, double radius);
    @Query("""
    SELECT t
    FROM Trips t
    WHERE t.driver.id = :driverId
      AND t.status IN (
          com.anokolie.rideshare.enums.TripStatus.ACCEPTED,
          com.anokolie.rideshare.enums.TripStatus.ARRIVED,
          com.anokolie.rideshare.enums.TripStatus.STARTED
      )
""")
    Optional<Trips> findActiveTripByDriverId(Long driverId);
}
