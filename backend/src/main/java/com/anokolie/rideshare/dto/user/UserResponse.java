package com.anokolie.rideshare.dto.user;

import com.anokolie.rideshare.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

public class UserResponse {
    @Getter @Setter
    private Long id;
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String firstName;
    @Getter @Setter
    private String lastName;
    @Getter @Setter
    private UserRole role;
    @Getter @Setter
    private Boolean emailVerified;
}
