package com.ecoharvest.controller;

import com.ecoharvest.entity.Order;
import com.ecoharvest.entity.User;
import com.ecoharvest.service.OrderService;
import com.ecoharvest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Purpose: REST API endpoints for order operations.
 * 
 * POST /api/orders       - Buyer places an order
 * GET /api/orders        - Admin views all orders
 * GET /api/orders/buyer  - Buyer views own orders
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    /**
     * POST - Place a new order (BUYER only, enforced by SecurityConfig)
     * Accepts JSON: { "productId": 1, "quantity": 2 }
     * Uses Map<String, Object> to avoid creating a DTO class.
     */
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Map<String, Object> orderRequest) {
        User buyer = getCurrentUser();
        Long productId = Long.valueOf(orderRequest.get("productId").toString());
        int quantity = Integer.parseInt(orderRequest.get("quantity").toString());

        try {
            Order order = orderService.placeOrder(productId, buyer.getId(), quantity);
            if (order == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Failed to place order. Invalid product or buyer."));
            }
            return ResponseEntity.ok(order);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    /** GET all orders - Admin only (enforced by SecurityConfig) */
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    /** GET buyer's own orders */
    @GetMapping("/buyer")
    public List<Order> getBuyerOrders() {
        User buyer = getCurrentUser();
        return orderService.getOrdersByBuyerId(buyer.getId());
    }

    /** Helper: Gets current user from SecurityContext */
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userService.findByEmail(auth.getName());
    }
}
