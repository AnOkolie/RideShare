package com.anokolie.rideshare.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="payment_method")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    @JoinColumn(name="user_id")
    private User user;
    @Column(nullable = false, unique = true)
    private String providerPaymentMethodId;
    private String brand;
    private String last4;
    private Integer expiryMonth;
    private Integer expiryYear;
    private boolean defaultPayment = false;
    private LocalDateTime createdAt;
}