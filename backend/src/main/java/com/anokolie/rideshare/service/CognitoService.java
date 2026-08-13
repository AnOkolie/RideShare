package com.anokolie.rideshare.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.CognitoIdentityProviderException;
import software.amazon.awssdk.services.cognitoidentityprovider.model.GetUserRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.GetUserResponse;

@Service

@RequiredArgsConstructor
public class CognitoService {

    private final CognitoIdentityProviderClient cognitoClient;

    public GetUserResponse getUser(String accessToken) {
        try {
            GetUserRequest request = GetUserRequest.builder().accessToken(accessToken).build();
            return cognitoClient.getUser(request);
        } catch (CognitoIdentityProviderException e) {
            String errorCode = e.awsErrorDetails().errorCode();
            int statusCode = e.statusCode();

            if ("NotAuthorizedException".equals(errorCode) || statusCode == 401) {
                System.err.println("Access Token has expired or is invalid.");
                throw new Error("Access Token has expired or is invalid.");
            } else if ("UserNotFoundException".equals(errorCode) || statusCode == 404) {
                System.err.println("User does not exist.");
                throw new Error("Invalid Credentials");
            } else {
                System.err.println("Cognito request failed with error: " + errorCode);
                throw new Error("Cognito request failed with error: " + errorCode);
            }
        }
    }
}