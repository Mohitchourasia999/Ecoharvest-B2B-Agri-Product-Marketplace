package com.ecoharvest.controller;

import com.ecoharvest.entity.User;
import com.ecoharvest.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Purpose: Handles authentication endpoints (login, register, logout, current user).
 * 
 * @RestController = @Controller + @ResponseBody (returns JSON)
 * @RequestMapping sets base URL for all endpoints in this controller
 * @CrossOrigin allows requests from React frontend
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * POST /api/auth/register
     * Registers a new user with encoded password.
     * Accepts JSON body: { name, email, password, role }
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Check if email already exists
        if (userService.findByEmail(user.getEmail()) != null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(error);
        }
        User savedUser = userService.register(user);
        return ResponseEntity.ok(savedUser);
    }

    /**
     * POST /api/auth/login
     * Authenticates user with email and password.
     * Creates a server-side session on success.
     * 
     * How it works:
     * 1. AuthenticationManager checks email/password against database
     * 2. On success, SecurityContext is created with the authentication
     * 3. SecurityContext is stored in HttpSession
     * 4. Spring sends JSESSIONID cookie to the browser
     * 5. Browser sends this cookie with every subsequent request
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest, HttpServletRequest request) {
        try {
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");

            // Step 1: Authenticate using Spring Security
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            // Step 2: Create SecurityContext and store authentication
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);

            // Step 3: Save SecurityContext in session
            HttpSession session = request.getSession(true);
            session.setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    context
            );

            // Step 4: Return user details (without password)
            User user = userService.findByEmail(email);
            return ResponseEntity.ok(user);

        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Invalid email or password");
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * POST /api/auth/logout
     * Invalidates the session and clears SecurityContext.
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/auth/me
     * Returns the currently logged-in user's details.
     * Used by frontend to check if user is still authenticated.
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(401).body(null);
        }
        String email = auth.getName();
        User user = userService.findByEmail(email);
        return ResponseEntity.ok(user);
    }
}
