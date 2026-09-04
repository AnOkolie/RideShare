package com.anokolie.rideshare.dto.driver;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DriverOnboardingRequest(
        @Valid @NotNull DriverDetails driver,
        @Valid @NotNull AddressDetails address,
        @Valid @NotNull LicenseDetails license,
        @Valid @NotNull VehicleDetails vehicle,
        @Valid @NotNull InsuranceDetails insurance,
        @Valid ProfileDetails profile,
        @Valid @NotNull BackgroundDetails background
) {

    public record DriverDetails(
            @NotBlank String name,
            @NotBlank String phone,

            @NotNull
            @JsonProperty("DoB")
            LocalDate dateOfBirth
    ) {}

    public record AddressDetails(
            String address
    ) {}

    public record LicenseDetails(
            @NotBlank String expiry,
            @NotBlank String number,
            @NotBlank String frontKey,
            @NotBlank String backKey
    ) {}

    public record VehicleDetails(
            @NotBlank String make,
            @NotBlank String model,
            @NotNull Integer year,
            @NotBlank String colour,
            @NotBlank String licensePlate,
            @NotNull Integer seats
    ) {}

    public record InsuranceDetails(
            @Valid @NotNull InsuranceUpload insurance,
            @NotNull LocalDate expiration
    ) {}

    public record InsuranceUpload(
            @NotBlank String insuranceKey
    ) {}

    public record ProfileDetails(
            String profilePicture
    ) {}

    public record BackgroundDetails(
            @NotNull
            @AssertTrue
            Boolean consent
    ) {}
}