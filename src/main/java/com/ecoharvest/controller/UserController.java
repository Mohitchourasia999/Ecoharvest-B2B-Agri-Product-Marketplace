package com.ecoharvest.controller;

import com.ecoharvest.entity.User;
import com.ecoharvest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Purpose: REST API endpoint for user management.
 * Only ADMIN can access these endpoints (enforced by SecurityConfig).
 * 
 * GET /api/users - Returns list of all users
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /** GET all users - Admin only */
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
