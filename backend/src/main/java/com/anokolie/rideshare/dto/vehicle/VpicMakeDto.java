package com.anokolie.rideshare.dto.vehicle;

import com.fasterxml.jackson.annotation.JsonProperty;

public record VpicMakeDto(
        @JsonProperty("MakeId")
        Integer makeId,

        @JsonProperty("MakeName")
        String makeName
) {}