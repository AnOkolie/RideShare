package com.anokolie.rideshare.dto.user;

public record CreateUserRequest(
        String cognitoSub,
        String firstName,
        String lastName,
        String email,
        boolean emailVerified
) {
}
