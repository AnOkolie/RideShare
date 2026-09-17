package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.user.CreateUserRequest;
import com.anokolie.rideshare.service.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/public")
@AllArgsConstructor
public class PublicController {

    private final UserService userService;
    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest user){
        try{
            return ResponseEntity.ok().body(userService.createUser(user));
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
