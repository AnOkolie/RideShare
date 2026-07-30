package com.anokolie.rideshare.config;

import org.springframework.context.annotation.Bean;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.ses.SesClient;

public class EmailSendingConfig {
    @Bean
    public SesClient sesClient() {
        return SesClient.builder()
                .region(Region.US_EAST_2) // match your region
                .build();
    }
}
