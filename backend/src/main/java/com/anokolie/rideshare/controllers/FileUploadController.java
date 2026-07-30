package com.anokolie.rideshare.controllers;

import com.anokolie.rideshare.service.ImageUpload;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.anokolie.rideshare.service.ImageUpload.*;

@RestController("/api/files")
public class FileUploadController {
    final ImageUpload imageUploadService;
    public FileUploadController(ImageUpload imageUploadService){
        this.imageUploadService = imageUploadService;
    }
    @GetMapping("/upload-url")
    public String getUploadedFile (@RequestParam String fileName){
        return imageUploadService.generatePresignedUploadUrl(fileName);
    }
}
