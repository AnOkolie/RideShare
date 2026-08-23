package com.anokolie.rideshare.service.riders;

import com.anokolie.rideshare.dto.rider.RiderObject;
import com.anokolie.rideshare.dto.rider.RiderUpdate;
import com.anokolie.rideshare.entity.RiderProfile;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.mapper.rider.RiderMapper;
import com.anokolie.rideshare.mapper.rider.RiderToUserMapper;
import com.anokolie.rideshare.repository.RiderRepository;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.user.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class RiderService {

    private final RiderRepository riderRepository;
    private final UserRepository userRepository;
    private final RiderMapper riderMapper;
    private final RiderToUserMapper riderUserMapper;
    private final UserService userService;

    public RiderObject updateRider (Long id, RiderUpdate rider){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User doesnt exist"));
        RiderProfile riderProfile = riderRepository.findById(user.getId()).orElseThrow(()-> new RuntimeException("Rider profile doesnt exist"));
        if(rider.getHomeAddress() != null)
            riderProfile.setHomeAddress(rider.getHomeAddress());
        return riderMapper.toResponse(riderProfile);
    }

    public Map<String,Object> updateUserWithRider (Long id, RiderUpdate rider){
        System.out.println("rider update structure" + rider.toString());
        Map<String,Object> resp = new HashMap<>();
        try{
            resp.put("userProfile",userService.updateUser(id,riderUserMapper.toResponse(rider,id)));
            resp.put("riderProfile",updateRider(id,rider));
            return resp;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public RiderObject updateOnboardingState(Long id){

        return riderRepository.findById(id)
                .map(rider -> {
                    rider.setOnboarding(true);
                    return riderMapper.toResponse(riderRepository.save(rider));
                })
                .orElseGet(() -> userRepository.findById(id)
                        .map(user -> {
                            RiderProfile rider = new RiderProfile();
                            rider.setUser(user); // required: establishes rider.id via @MapsId
                            rider.setOnboarding(true);
                            rider.setRating(BigDecimal.ZERO);
                            rider.setTotalTrips(0);

                            return riderMapper.toResponse(riderRepository.save(rider));
                        })
                        .orElseThrow(() -> new RuntimeException("User does not exist")));
    }
}
