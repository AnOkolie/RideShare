package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.dto.upload.PresignedUploadRequest;
import com.anokolie.rideshare.dto.upload.PresignedUploadResponse;
import com.anokolie.rideshare.dto.upload.UploadType;
import com.anokolie.rideshare.repository.UserRepository;
import com.anokolie.rideshare.service.S3UploadService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@AllArgsConstructor
public class UploadController {

    private final S3UploadService uploadService;
    private final UserRepository userRepository;
    @PostMapping("/presign")
    public ResponseEntity<Map<String,Object>> getPresignedUrl(@AuthenticationPrincipal Jwt jwt,@RequestBody PresignedUploadRequest request){
        Long userId = userRepository.findByCognitoSub(jwt.getSubject()).orElseThrow(() -> new RuntimeException("User not found")).getId();
        System.out.println("jwt: " + userId);
        UploadType type = request.uploadType();
        String folder = type == UploadType.PROFILE_PICTURE ? "/profile/" : type == UploadType.DRIVER_DOCUMENT ? "/license/" : type == UploadType.INSURANCE_DOCUMENT ? "/insurance/" : null;
        String rootFolder = request.role().toString() + "/";
        String extension = uploadService.extensionFor(request.contentType());
        String key =
                rootFolder.toLowerCase() +
                        userId +
                        folder +
                        UUID.randomUUID() + "." +
                        extension;
        Map<String,Object> resp = new HashMap<>();
        com.anokolie.rideshare.dto.upload.PresignedUploadResponse presigned = uploadService.createUploadUrl(key, request.contentType());
        resp.put("key",presigned.key());
        resp.put("uploadUrl",presigned.uploadUrl());
        return ResponseEntity.ok().body(resp);
    }
}
