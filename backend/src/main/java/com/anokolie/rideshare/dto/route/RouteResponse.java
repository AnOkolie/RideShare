package com.anokolie.rideshare.dto.route;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RouteResponse (
        List<Route> routes
){

}
