package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.TripPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripPaymentRepository extends JpaRepository<TripPayment,Long> {
}
