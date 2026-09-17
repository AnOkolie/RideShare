package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.EmergencyContact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmergencyContactRepository extends JpaRepository<EmergencyContact,Long> {
}
