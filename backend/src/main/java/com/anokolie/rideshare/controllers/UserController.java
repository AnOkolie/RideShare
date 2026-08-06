package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.user.UserResponse;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.mapper.user.UserMapper;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/users")
public class UserController {
    final private UserService userService;
    final private UserMapper userMapper;
    public UserController(UserService userRepository, UserMapper userMapper){
        this.userService = userRepository;
        this.userMapper = userMapper;
    }

    /**
     * @param jwt
     * @return string
     */
    @PostMapping("/bootstrap")
    public ResponseEntity<UserResponse> bootstrap(@AuthenticationPrincipal Jwt jwt){
        User user = userService.syncUser(jwt);
        UserResponse response = userMapper.toResponse(user);
        return ResponseEntity.ok(response);
    }
}
