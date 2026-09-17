package com.anokolie.rideshare.service.riders;

import com.anokolie.rideshare.dto.rider.RiderObject;
import com.anokolie.rideshare.dto.rider.RiderOnboardingRequest;
import com.anokolie.rideshare.dto.rider.RiderUpdate;
import com.anokolie.rideshare.entity.EmergencyContact;
import com.anokolie.rideshare.entity.PaymentMethod;
import com.anokolie.rideshare.entity.RiderProfile;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.mapper.rider.RiderMapper;
import com.anokolie.rideshare.mapper.rider.RiderToUserMapper;
import com.anokolie.rideshare.repository.EmergencyContactRepository;
import com.anokolie.rideshare.repository.PaymentMethodRepository;
import com.anokolie.rideshare.repository.RiderRepository;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class RiderService {

    private final RiderRepository riderRepository;
    private final UserRepository userRepository;
    private final EmergencyContactRepository emergencyContactRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final RiderMapper riderMapper;
    private final RiderToUserMapper riderUserMapper;
    private final UserService userService;

    public RiderObject updateRider (Long id, RiderUpdate rider){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User doesnt exist"));
        RiderProfile riderProfile = riderRepository.findById(user.getId()).orElseThrow(()-> new RuntimeException("Rider profile doesnt exist"));
        if(rider.getHomeAddress() != null)
            riderProfile.setHomeAddress(rider.getHomeAddress());

        if(rider.getHomePlaceId() != null)
            riderProfile.setHomePlaceId(rider.getHomePlaceId());
        if(rider.getHomeLatitude() != null)
            riderProfile.setHomeLatitude(rider.getHomeLatitude());
        if(rider.getHomeLongitude() != null)
            riderProfile.setHomeLongitude(rider.getHomeLongitude());
        riderRepository.save(riderProfile);
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
    public RiderObject createRider(Long id, RiderOnboardingRequest request){
        User user = userRepository.findById(id).orElseThrow(()->new RuntimeException("This user does not exist"));
        EmergencyContact emergency = new EmergencyContact();
        emergency.setFirstName(request.emergencyContact().firstName());
        emergency.setLastName(request.emergencyContact().lastName());
        emergency.setPhoneNumber(request.emergencyContact().phoneNumber());
        emergency.setUser(user);
        emergencyContactRepository.save(emergency);
        List<EmergencyContact> emergencyList = new ArrayList<>();
        emergencyList.add(emergency);
        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod.setLast4(request.payment().cardNumber().substring(request.payment().cardNumber().length()-4));
        paymentMethod.setUser(user);
        paymentMethod.setExpiryMonth(request.payment().expirationMonth());
        paymentMethod.setExpiryYear(request.payment().expirationYear());
        paymentMethod.setDefaultPayment(request.payment().defaultPayment());
        paymentMethod.setBrand(request.payment().brand());
        paymentMethodRepository.save(paymentMethod);
        RiderProfile newRider = new RiderProfile();
        newRider.setUser(user);
        newRider.setOnboarding(true);
        newRider.setHomeAddress(request.home().address());
        newRider.setHomeLatitude(request.home().latitude());
        newRider.setHomePlaceId(request.home().placeId());
        newRider.setHomeLongitude(request.home().longitude());
        user.setEmergencyContact(emergencyList);
        return riderMapper.toResponse(riderRepository.save(newRider));
    }
}
