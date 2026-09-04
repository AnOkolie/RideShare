package com.anokolie.rideshare.mapper.driver_document;

import com.anokolie.rideshare.dto.driver.DriverOnboardingRequest;
import com.anokolie.rideshare.entity.DriverDocument;
import com.anokolie.rideshare.entity.DriverProfile;
import com.anokolie.rideshare.enums.DocumentType;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DriverDocumentMapper {

    public List<DriverDocument> toEntities(
            DriverOnboardingRequest request,
            DriverProfile driver
    ) {
        List<DriverDocument> documents = new ArrayList<>();

        documents.add(createDocument(
                driver,
                DocumentType.LICENSE_FRONT,
                request.license().frontKey()
        ));

        documents.add(createDocument(
                driver,
                DocumentType.LICENSE_BACK,
                request.license().backKey()
        ));

        documents.add(createDocument(
                driver,
                DocumentType.INSURANCE_DOCUMENT,
                request.insurance().insurance().insuranceKey()
        ));

        // Profile picture is optional in your current request structure.
        if (request.profile() != null
                && request.profile().profilePicture() != null
                && !request.profile().profilePicture().isBlank()) {

            documents.add(createDocument(
                    driver,
                    DocumentType.PROFILE_PICTURE,
                    request.profile().profilePicture()
            ));
        }

        return documents;
    }

    private DriverDocument createDocument(
            DriverProfile driver,
            DocumentType documentType,
            String s3Key
    ) {
        DriverDocument document = new DriverDocument();

        document.setDriver(driver);
        document.setDocumentType(documentType);
        document.setS3Key(s3Key);
        document.setUploadedAt(LocalDateTime.now());

        return document;
    }
}