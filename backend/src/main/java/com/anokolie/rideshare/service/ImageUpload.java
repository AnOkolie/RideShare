package com.anokolie.rideshare.service;

import com.anokolie.rideshare.config.S3Config;
import org.springframework.context.annotation.Bean;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import com.anokolie.rideshare.config.S3Config.*;
import java.time.Duration;

public class ImageUpload {
    private final S3Config imageConfig;
    public ImageUpload(S3Config imageConfig){
        this.imageConfig = imageConfig;
    }
    public String generatePresignedUploadUrl(String key) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket("aws-ride-share-bucket")
                .key(key)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(5))
                .putObjectRequest(objectRequest)
                .build();

        return imageConfig.s3Presigner().presignPutObject(presignRequest).url().toString();
    }
}
