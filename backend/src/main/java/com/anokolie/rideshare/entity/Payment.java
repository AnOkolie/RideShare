package com.anokolie.rideshare.entity;

import com.anokolie.rideshare.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="payments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;



    @OneToOne
    @JoinColumn(name="trip_id")
    private Trip trip;



    private String stripePaymentIntent;


    private Integer amountCents;


    private String currency;



    @Enumerated(EnumType.STRING)
    private PaymentStatus status;


    private LocalDateTime createdAt;

}