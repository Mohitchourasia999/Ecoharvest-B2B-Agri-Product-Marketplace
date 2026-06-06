package com.ecoharvest.repository;

import com.ecoharvest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Purpose: Data access layer for the users table.
 * JpaRepository provides built-in CRUD methods (save, findAll, findById, delete).
 * We add a custom method findByEmail to search users by email.
 * Spring Data JPA auto-generates the SQL query from the method name.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
