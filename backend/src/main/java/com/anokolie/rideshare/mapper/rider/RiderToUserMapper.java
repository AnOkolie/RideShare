package com.anokolie.rideshare.mapper.rider;

import com.anokolie.rideshare.dto.rider.RiderUpdate;
import com.anokolie.rideshare.dto.user.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class RiderToUserMapper {
    public UserResponse toResponse(RiderUpdate rider, Long id){
        UserResponse user = new UserResponse();
        user.setLastName(rider.getLastName());
        user.setFirstName(rider.getFirstName());
        user.setPhoneNumber(rider.getPhoneNumber());
        user.setProfilePicture(rider.getProfilePic());
        user.setId(id);
        return user;
    }
}
