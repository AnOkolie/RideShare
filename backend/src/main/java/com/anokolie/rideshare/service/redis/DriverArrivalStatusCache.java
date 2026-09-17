package com.anokolie.rideshare.service.redis;

import lombok.AllArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;

@AllArgsConstructor
public class DriverArrivalStatusCache {
    private final StringRedisTemplate redisTemplate;

}
