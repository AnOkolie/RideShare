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
    @JoinColumn(name="user_id")
    private User user;



    private String name;

    private String relationship;

    private String phoneNumber;

}