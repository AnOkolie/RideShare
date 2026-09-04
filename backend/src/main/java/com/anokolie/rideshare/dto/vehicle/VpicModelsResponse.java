package com.anokolie.rideshare.dto.vehicle;

import java.util.List;

public record VpicModelsResponse(

        Integer Count,

        String Message,

        String SearchCriteria,

        List<VpicModelDto> Results

) {}
