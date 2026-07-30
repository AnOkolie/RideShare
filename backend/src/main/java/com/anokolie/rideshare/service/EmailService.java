package com.anokolie.rideshare.service;

import com.anokolie.rideshare.config.EmailConfig;
import software.amazon.awssdk.services.ses.model.*;

public class EmailService {
    private final EmailConfig emailConfig;

    public EmailService(EmailConfig emailConfig){
        this.emailConfig = emailConfig;
    }

    public void sendEmail(String toAddress, String subject, String bodyText) {
        Destination destination = Destination.builder()
                .toAddresses(toAddress)
                .build();

        Content subjectContent = Content.builder().data(subject).build();
        Content bodyContent = Content.builder().data(bodyText).build();
        Body body = Body.builder().text(bodyContent).build();

        Message message = Message.builder()
                .subject(subjectContent)
                .body(body)
                .build();

        SendEmailRequest request = SendEmailRequest.builder()
                .destination(destination)
                .message(message)
                .source("noreply@yourdomain.com") // must match a verified identity
                .build();

        emailConfig.sesClient().sendEmail(request);
    }
}
