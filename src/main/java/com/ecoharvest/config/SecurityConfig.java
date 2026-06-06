package com.ecoharvest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Purpose: Configures Spring Security for the application.
 * 
 * Key concepts:
 * - CORS: Allows React frontend (port 5173) to call backend (port 8080)
 * - CSRF: Disabled because we use REST APIs (stateless requests)
 * - Session: Uses server-side sessions (JSESSIONID cookie)
 * - Authorization: URL-based role checks
 * - PasswordEncoder: BCrypt for secure password hashing
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * BCrypt password encoder bean.
     * Used to hash passwords before storing in database.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * AuthenticationManager bean.
     * Used in AuthController to manually authenticate users during login.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Main security filter chain.
     * Defines which URLs are public and which require authentication/roles.
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Enable CORS with our custom config
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // Disable CSRF (not needed for REST APIs)
            .csrf(csrf -> csrf.disable())
            // URL-based authorization rules
            .authorizeHttpRequests(auth -> auth
                // Auth endpoints are public (login, register)
                .requestMatchers("/api/auth/**").permitAll()
                // Only ADMIN can access user management
                .requestMatchers("/api/users/**").hasRole("ADMIN")
                // Only SELLER can create, update, delete products
                .requestMatchers(HttpMethod.POST, "/api/products").hasRole("SELLER")
                .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("SELLER")
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("SELLER")
                .requestMatchers("/api/products/seller").hasRole("SELLER")
                // Only BUYER can place orders
                .requestMatchers(HttpMethod.POST, "/api/orders").hasRole("BUYER")
                .requestMatchers("/api/orders/buyer").hasRole("BUYER")
                // All other requests need authentication
                .anyRequest().authenticated()
            )
            // Use session-based authentication
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
            );

        return http.build();
    }

    /**
     * CORS configuration.
     * Allows React frontend running on localhost:5173 to make API calls.
     * allowCredentials(true) is needed to send session cookies.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
