package com.anokolie.rideshare.dto.user;

import com.anokolie.rideshare.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private Boolean emailVerified;
    private String phoneNumber;
    private String profilePicture;
}
