package com.ecoharvest.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

/**
 * Purpose: JPA Entity mapped to the "users" table.
 * Represents a user with roles: ADMIN, SELLER, or BUYER.
 * 
 * @Entity tells JPA this class maps to a database table.
 * @Table(name = "users") specifies the table name.
 * @JsonProperty(access = WRITE_ONLY) on password ensures it is
 *   accepted in JSON input but never sent in JSON output.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String role; // ADMIN, SELLER, BUYER

    // Default constructor required by JPA
    public User() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
