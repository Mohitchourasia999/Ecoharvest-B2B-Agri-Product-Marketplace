package com.ecoharvest.repository;

import com.ecoharvest.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Purpose: Data access layer for the orders table.
 * JpaRepository provides built-in CRUD methods.
 * findByBuyerId returns all orders placed by a specific buyer.
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyerId(Long buyerId);
}
