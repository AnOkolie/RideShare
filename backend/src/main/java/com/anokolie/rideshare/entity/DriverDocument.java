package com.anokolie.rideshare.entity;

import com.anokolie.rideshare.enums.DocumentType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Table(
        name = "driver_documents",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_driver_document_type",
                columnNames = {"driver_id", "document_type"}
        )
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DriverDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "driver_id", nullable = false)
    private DriverProfile driver;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_type", nullable = false)
    private DocumentType documentType;

    @Column(name = "s3_key", nullable = false, length = 1024)
    private String s3Key;

    private LocalDateTime uploadedAt;
}
