package com.anokolie.rideshare.service.user;

import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.CognitoService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cognitoidentityprovider.model.AttributeType;
import software.amazon.awssdk.services.cognitoidentityprovider.model.GetUserResponse;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
    }



    public Optional<User> findByCognitoSub(String sub){
        return userRepository.findByCognitoSub(sub);
    }
}
