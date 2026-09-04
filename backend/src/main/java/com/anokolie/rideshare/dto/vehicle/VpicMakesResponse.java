package com.anokolie.rideshare.dto.vehicle;

import java.util.List;

public record VpicMakesResponse(
        Integer Count,
        String Message,
        List<VpicMakeDto> Results
) {}
