package com.anokolie.rideshare.service.redis;

import com.anokolie.rideshare.service.stomp.OfferDriverRideService;
import com.anokolie.rideshare.dto.trips.DriverTripOfferResponse;
import com.anokolie.rideshare.entity.DriverLocation;
import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.entity.Trips;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.repository.DriverRepository;
import com.anokolie.rideshare.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.domain.geo.GeoReference;
import org.springframework.stereotype.Service;


import java.time.Duration;
import java.util.Map;

@Service
@AllArgsConstructor
@Slf4j
public class DriverLocationCache {
    private static final Duration LOCATION_TTL = Duration.ofSeconds(60);
    private static final Duration LOCATION_FRESHNESS = Duration.ofSeconds(15);
    private static final String DRIVER_LOCATIONS_KEY = "driver:locations";
    private final StringRedisTemplate redisTemplate;
    private final OfferDriverRideService offerDriverRideService;
    private final DriverRepository driverRepository;
    private final UserRepository userRepository;

    public void save(String driverId, DriverLocation location) {
        log.info("driverId: " + driverId + " location: " + location);
        try {
            Point point = new Point(location.getLongitude(),location.getLatitude());
            redisTemplate.opsForGeo().add(DRIVER_LOCATIONS_KEY, point, driverId);
            Point savedValue = redisTemplate.opsForGeo().position(DRIVER_LOCATIONS_KEY,driverId).getFirst();
            saveLocationFreshness(driverId);
            Long ttl = redisTemplate.getExpire(DRIVER_LOCATIONS_KEY);

            log.info(
                    "Redis verification: key={}, found={}, ttl={}",
                    DRIVER_LOCATIONS_KEY,
                    savedValue != null,
                    ttl
            );
        } catch (Exception e) {
            throw new IllegalStateException("Could not cache driver location", e);
        }
    }

    public GeoResults<RedisGeoCommands.GeoLocation<String>> find(
            Double lng,
            Double lat,
            Double radiusKm
    ) {
        log.info("calling find drivers");
        try {
            return redisTemplate.opsForGeo().search(
                    DRIVER_LOCATIONS_KEY,
                    GeoReference.fromCoordinate(lng, lat),
                    new Distance(
                            radiusKm,
                            RedisGeoCommands.DistanceUnit.KILOMETERS
                    ),
                    RedisGeoCommands.GeoSearchCommandArgs
                            .newGeoSearchArgs()
                            .includeDistance()
                            .includeCoordinates()
                            .sortAscending()
                            .limit(10)
            );

        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException("Unable to search nearby drivers", e);
        }
    }

    public void remove(String driverId){
        try{
            redisTemplate.opsForGeo().remove(DRIVER_LOCATIONS_KEY,driverId);
            redisTemplate.delete(driverId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private void saveLocationFreshness(String driverId){
        try{
            String key = "driver:"+driverId+":location-freshness";
            Long currTime = System.currentTimeMillis();
            redisTemplate.opsForValue().set(key,String.valueOf(currTime),LOCATION_FRESHNESS);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    private boolean hasFreshLocation(String driverId){
        String key = "driver"+driverId+":location-freshness";
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public void saveDriverEta(Long tripId, String etaSeconds, double lng, double lat, int distanceMeters){
        String etaKey = "trip:"+tripId+":eta";
        redisTemplate.opsForHash().putAll(etaKey, Map.of(
                "etaSeconds",etaSeconds,
                "calculatedAt",String.valueOf(System.currentTimeMillis()),
                "driverLatitude",lat,
                "driverLongitude",lng,
                "distanceMeters",String.valueOf(distanceMeters)
        ));
        redisTemplate.expire(etaKey,Duration.ofMinutes(2));
    }
    public Map<String,String> getDriverEta(Long tripId){
        String key = "trip:"+tripId+":eta:lock";
        return Map.of("etaSeconds",(String) redisTemplate.opsForHash().get(key, "etaSeconds"),
                "driverLongitude",(String) redisTemplate.opsForHash().get(key, "driverLongitude"),
                "driverLatitude",(String) redisTemplate.opsForHash().get(key, "driverLatitude"),
                "distanceMeters",(String) redisTemplate.opsForHash().get(key, "distanceMeters"),
                "calculatedAt",(String) redisTemplate.opsForHash().get(key, "calculatedAt")
                );
    }
    public void acquireLock(Long tripId){
        String lockKey = "trip:" + tripId + ":eta:lock";

        Boolean acquired = redisTemplate
                .opsForValue()
                .setIfAbsent(lockKey, "1", Duration.ofSeconds(30));

        if (!Boolean.TRUE.equals(acquired)) {
            return; // Another request is already refreshing ETA
        }
    }
    public void matchDrivers(String cognitoSub, Trips trip){
        final double RADIUS_KM = 10;
        log.info("geo results...");
        GeoResults<RedisGeoCommands.GeoLocation<String>> results = find(trip.getPickupLocation().getX(), trip.getPickupLocation().getY(),RADIUS_KM);
        for(GeoResult<RedisGeoCommands.GeoLocation<String>> result: results){
            String driverId = result.getContent().getName();
            log.info("eligible drivers {}",driverId);
            if(!hasFreshLocation(driverId)){
                redisTemplate.opsForGeo().remove(DRIVER_LOCATIONS_KEY,driverId);
//                continue;
            }
            User user = userRepository.findById(Long.parseLong(driverId)).orElseThrow(()->new RuntimeException("Missing user profile"));
            DriverProfile driver = driverRepository.findById(Long.parseLong(driverId)).orElseThrow(()->new RuntimeException("Missing driver profile"));
            DriverTripOfferResponse driverTrip = new DriverTripOfferResponse(
                    trip.getId(),
                    trip.getPickupAddress(),
                    trip.getDestinationAddress(),
                    trip.getEstimatedDistance(),
                    trip.getEstimatedDuration(),
                    trip.getFareCents()
            );
            offerDriverRideService.offerRide(user.getCognitoSub(), driverTrip);
        }
    }
}
