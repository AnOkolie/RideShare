package com.anokolie.rideshare.mapper.rider;

import com.anokolie.rideshare.dto.rider.RiderObject;
import com.anokolie.rideshare.entity.RiderProfile;
import org.springframework.stereotype.Component;

@Component
public class RiderMapper {
    public RiderObject toResponse(RiderProfile riderProfile){
        RiderObject newResponse = new RiderObject();
        newResponse.setRiderOnboarding(riderProfile.getOnboarding());
        newResponse.setFirstName(riderProfile.getUser().getFirstName());
        newResponse.setLastName(riderProfile.getUser().getLastName());
        newResponse.setRating(riderProfile.getRating());
        newResponse.setTotalTrips(riderProfile.getTotalTrips());
        return newResponse;
    }
}
