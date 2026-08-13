package com.anokolie.rideshare.service.user;

import com.anokolie.rideshare.dto.user.UserResponse;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.CognitoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.GetUserResponse;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserService {

    final private UserRepository userRepository;
    final private CognitoService cognitoService;
    public UserService(UserRepository userRepository, CognitoService cognitoService){
        this.userRepository = userRepository;
        this.cognitoService = cognitoService;
    }

    public String getSub(Jwt jwt) {
        return jwt.getSubject();
    }

//    public User updateProfile(){}
    public User syncUser(Jwt jwt){
        try{
            String sub = getSub(jwt);
            Optional<User> user = userRepository.findByCognitoSub(sub);
            GetUserResponse response = cognitoService.getUser(jwt.getTokenValue());

            Map<String,String> resp = response.userAttributes()
                    .stream().collect(Collectors.toMap(AttributeType::name,AttributeType::value));
            if(user.isPresent()){
                return user.get();
            }
            User newUser = new User();
            newUser.setEmail(resp.get("email"));
            newUser.setEmailVerified(Boolean.parseBoolean(resp.get("email_verified")));
            newUser.setFirstName(resp.get("given_name"));
            newUser.setLastName(resp.get("family_name"));
            newUser.setCognitoSub(sub);
            return userRepository.save(newUser);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new Error(e);
        }
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow();
    }

    public void updateUser(Long id, UserResponse dto){
        User entity = getUserById(id);
        if (dto.getFirstName() != null)

            entity.setFirstName(dto.getFirstName());

        if (dto.getLastName() != null)

            entity.setLastName(dto.getLastName());

        if (dto.getPhoneNumber() != null)

            entity.setPhoneNumber(dto.getPhoneNumber());

        if (dto.getProfilePicture() != null)

            entity.setProfilePicture(dto.getProfilePicture());
        userRepository.save(entity);
    }

    public Optional<User> findByCognitoSub(String sub){
        return userRepository.findByCognitoSub(sub);
    }


}
