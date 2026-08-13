package com.anokolie.rideshare.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
@Configuration
public class S3Config {
    @Bean
    public S3Presigner s3Presigner() {
        return S3Presigner.builder()
                .region(Region.US_EAST_2) // match your actual region
                .build();
    }
}
