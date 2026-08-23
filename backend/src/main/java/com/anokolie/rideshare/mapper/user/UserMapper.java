package com.anokolie.rideshare.mapper.user;

import com.anokolie.rideshare.dto.user.UserResponse;
import com.anokolie.rideshare.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse (User user){
        UserResponse newResponse = new UserResponse();
        newResponse.setEmail(user.getEmail());
        newResponse.setId(user.getId());
        newResponse.setFirstName(user.getFirstName());
        newResponse.setLastName(user.getLastName());
        newResponse.setPhoneNumber(user.getPhoneNumber());
        newResponse.setProfilePicture(user.getProfilePicture());
        newResponse.setEmailVerified(user.getEmailVerified());
        return newResponse;
    }
}
