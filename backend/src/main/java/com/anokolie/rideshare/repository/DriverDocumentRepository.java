package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.DriverDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverDocumentRepository extends JpaRepository<DriverDocument,Long> {
}
