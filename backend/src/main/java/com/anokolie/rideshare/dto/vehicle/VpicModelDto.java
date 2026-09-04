package com.anokolie.rideshare.dto.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;

public record VpicModelDto(

        @JsonProperty("Make_ID")
        Integer makeId,

        @JsonProperty("Make_Name")
        String makeName,

        @JsonProperty("Model_ID")
        Integer modelId,

        @JsonProperty("Model_Name")
        String modelName,
        @JsonProperty("Model_Year")
        String modelYear

) {}
