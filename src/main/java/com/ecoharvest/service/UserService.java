package com.ecoharvest.service;

import com.ecoharvest.entity.User;
import com.ecoharvest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Purpose: Business logic for user operations.
 * Also implements UserDetailsService for Spring Security authentication.
 * 
 * UserDetailsService is used by Spring Security to load user details
 * during login. The loadUserByUsername method is called automatically.
 */
@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Called by Spring Security during login.
     * Loads user by email and returns a UserDetails object.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole()) // Spring Security adds "ROLE_" prefix automatically
                .build();
    }

    /**
     * Registers a new user. Encodes password using BCrypt before saving.
     */
    public User register(User user) {
        if (user == null) {
            return null;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Finds a user by email. Used after login to get full user details.
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    /**
     * Returns all users. Used by ADMIN to view all users.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
