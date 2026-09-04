package com.anokolie.rideshare.dto.upload;

public record PresignedUploadRequest(
        String fileName,
        String contentType,
        UploadType uploadType,
        RolePermission role
) {}
