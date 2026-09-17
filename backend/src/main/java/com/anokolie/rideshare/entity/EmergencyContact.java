package com.anokolie.rideshare.entity;

import com.anokolie.rideshare.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

import javax.management.Notification;
import java.util.List;
@Entity
@Table(name="emergency_contacts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyContact {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="rider_id")
    private User user;
    private String firstName;
    private String lastName;
    private String phoneNumber;
}