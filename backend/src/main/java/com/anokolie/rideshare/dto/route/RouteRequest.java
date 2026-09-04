package com.anokolie.rideshare.dto.route;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RouteRequest {
    private AddressWrapper origin;
    private AddressWrapper destination;
    @Getter @Setter
    public static class AddressWrapper {
        private Double latitude;
        private Double longitude;
    }
}
