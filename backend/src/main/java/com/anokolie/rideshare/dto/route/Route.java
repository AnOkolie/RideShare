package com.anokolie.rideshare.dto.route;

public record Route(
        Integer distanceMeters,
        String duration,
        Polyline polyline
) {
    public Route{
        if(distanceMeters == null){
            distanceMeters = 0;
        }
    }
}