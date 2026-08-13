package com.anokolie.rideshare.config;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Slf4j

    @Configuration
    public class CorsConfig {

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();

            configuration.setAllowedOrigins(List.of(
                    "http://localhost:5173",
                    "https://your-frontend.vercel.app"
            ));

            configuration.setAllowedMethods(List.of(
                    "GET",
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE",
                    "OPTIONS"
            ));

            configuration.setAllowedHeaders(List.of(
                    "Authorization",
                    "Content-Type"
            ));
            configuration.setAllowCredentials(true);

            UrlBasedCorsConfigurationSource source =
                    new UrlBasedCorsConfigurationSource();

            source.registerCorsConfiguration("/**", configuration);

            return source;
        }
    }


