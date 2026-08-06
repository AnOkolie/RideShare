package com.anokolie.rideshare.entity;

import com.anokolie.rideshare.enums.DocumentType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="driver_documents")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DriverDocument {


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;



    @ManyToOne
    @JoinColumn(name="driver_id")
    private DriverProfile driver;



    @Enumerated(EnumType.STRING)
    private DocumentType documentType;



    @Column(columnDefinition="TEXT")
    private String documentUrl;


    private LocalDateTime uploadedAt;
}