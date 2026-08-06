package com.anokolie.rideshare.entity;

import com.anokolie.rideshare.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false, unique=true)
    private String cognitoSub;
    @Column(nullable=false, unique=true)
    private String email;
    private String firstName;
    private String lastName;
    private String displayName;
    private String phoneNumber;
    @Column(columnDefinition="TEXT")
    private String profilePicture;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private Boolean emailVerified;
    @OneToOne(mappedBy="user",
            cascade=CascadeType.ALL)
    private RiderProfile riderProfile;
    @OneToOne(mappedBy="user",
            cascade=CascadeType.ALL)
    private DriverProfile driverProfile;
    @OneToMany(mappedBy="user")
    private List<Notification> notifications;
}