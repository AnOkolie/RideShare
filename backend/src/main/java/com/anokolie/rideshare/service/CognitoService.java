package com.anokolie.rideshare.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.GetUserRequest;
import software.amazon.awssdk.services.cognitoidentityprovider.model.GetUserResponse;

@Service

@RequiredArgsConstructor
public class CognitoService {

    private final CognitoIdentityProviderClient cognitoClient;

    public GetUserResponse getUser(String accessToken) {
        GetUserRequest request = GetUserRequest.builder().accessToken(accessToken).build();
        return cognitoClient.getUser(request);
    }
    public String getLastName(String accessToken){
        GetUserResponse response = getUser(accessToken);
        return response.userAttributes().getFirst().name();
    }
}
