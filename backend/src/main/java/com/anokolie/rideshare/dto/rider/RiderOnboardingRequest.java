package com.anokolie.rideshare.dto.rider;

public record RiderOnboardingRequest (
        RiderProfile rider,
        EmergencyContact emergencyContact,
        Home home,
        Payment payment
){
    public record RiderProfile(
            String publicName,
            String phoneNumber,
            String profilePicture
    ){};
    public record EmergencyContact(
            String firstName,
            String lastName,
            String phoneNumber
    ){};
    public record Home(
            String address,
            String placeId,
            Double latitude,
            Double longitude
    ){};
    public record Payment(
            String cardNumber,
            String cvv,
            Integer expirationMonth,
            Integer expirationYear,
            String firstName,
            String lastName,
            Boolean defaultPayment,
            String brand
    ){};
}
