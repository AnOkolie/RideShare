package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.user.UserResponse;
import com.anokolie.rideshare.entity.User;
import com.anokolie.rideshare.mapper.user.UserMapper;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import com.anokolie.rideshare.dto.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.time.LocalDateTime;


@RestController
@RequestMapping("/api/users")
public class UserController {
    final private UserService userService;
    final private UserMapper userMapper;
    private static final Logger logger =
            LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userRepository, UserMapper userMapper){
        this.userService = userRepository;
        this.userMapper = userMapper;
    }

    /**
     * @param jwt
     * @return string
     */
    @PostMapping("/bootstrap")
    public ResponseEntity<?> bootstrap(@AuthenticationPrincipal Jwt jwt){
        logger.info(">>> 'api/auth/bootstrap' is called");
        try{
            User user = userService.syncUser(jwt);
//        if(user == null){
//            ErrorResponse error = new ErrorResponse(
//                    LocalDateTime.now(),
//                    HttpStatus.BAD_REQUEST.value(),
//                    "Bad Request",
//                    "This coupon code has expired.",
//                    "/api/users/bootstrap"
//            );
//
//            return ResponseEntity.badRequest().body(error); // Returns 400 with payload
//        }
            UserResponse response = userMapper.toResponse(user);
            logger.info(
                    "Authenticated user: {}",
                    response != null
                            ? response.getFirstName()+response.getLastName()
                            : "NONE"
            );
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            ErrorResponse error = new ErrorResponse(
                    LocalDateTime.now(),
                    HttpStatus.BAD_REQUEST.value(),
                    "Bad Request",
                    e.getMessage(),
                    "/api/users/bootstrap"
            );

            return ResponseEntity.badRequest().body(error); // Returns 400 with payload
        }

    }
    @PatchMapping ("/select-role")
    public ResponseEntity<Void> selectRole(@PathVariable Long id, @RequestBody UserResponse user){
        userService.updateUser(id,user);
        return ResponseEntity.noContent().build();
    }

}
