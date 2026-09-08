package com.anokolie.rideshare.service.redis;

import com.anokolie.rideshare.entity.DriverLocation;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.time.Duration;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class DriverLocationCache {
    private static final Duration LOCATION_TTL = Duration.ofSeconds(60);
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    /**
     *
     * @param driverId
     * @param location
     */
    public void save(String driverId, DriverLocation location) {
        log.info("driverId: " + driverId + " location: " + location);
        try {
            String key = "driver:location:" + driverId;
            String value = objectMapper.writeValueAsString(location);

            redisTemplate.opsForValue().set(key, value, LOCATION_TTL);
            String savedValue = redisTemplate.opsForValue().get(key);
            Long ttl = redisTemplate.getExpire(key);

            log.info(
                    "Redis verification: key={}, found={}, ttl={}",
                    key,
                    savedValue != null,
                    ttl
            );
        } catch (Exception e) {
            throw new IllegalStateException("Could not cache driver location", e);
        }
    }

    public Optional<DriverLocation> find(String driverId){
        try{
            String key = getKey(driverId);
            String value = redisTemplate.opsForValue()
                    .get(key);

            if (value == null) {
                return Optional.empty();
            }

            return Optional.of(objectMapper.readValue(value, DriverLocation.class));
        }catch(JsonProcessingException exception) {
            throw new IllegalStateException("Could not read cached driver location", exception);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void remove(String driverId){
        try{
            redisTemplate.delete(getKey(driverId));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String getKey(String driverId) throws Exception{
        if(!driverId.isBlank()){
            return "driver:location:" + driverId;
        }
        throw new Exception("Driver id cant be null");
    }
}
