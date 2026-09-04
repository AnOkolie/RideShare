package com.anokolie.rideshare.dto.upload;

public record PresignedUploadResponse(
        String uploadUrl,
        String key
) {}