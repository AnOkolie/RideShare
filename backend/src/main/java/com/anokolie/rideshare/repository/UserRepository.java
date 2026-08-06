package com.anokolie.rideshare.repository;

import com.anokolie.rideshare.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional <User> findByCognitoSub(String sub);
    Optional<User> findByEmail(String email);

    boolean existsByCognitoSub(String sub);
}
