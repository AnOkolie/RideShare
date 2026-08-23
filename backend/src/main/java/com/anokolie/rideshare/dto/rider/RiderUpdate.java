package com.anokolie.rideshare.dto.rider;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Data
public class RiderUpdate {
    private String firstName;
    private String lastName;
    private String displayName;
    private String email;
    private String phoneNumber;
    private String profilePic;
    private String homeAddress;
}

