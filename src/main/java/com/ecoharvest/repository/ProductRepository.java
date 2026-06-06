package com.ecoharvest.repository;

import com.ecoharvest.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Purpose: Data access layer for the products table.
 * JpaRepository provides built-in CRUD methods.
 * findBySellerId returns all products belonging to a specific seller.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySellerId(Long sellerId);
}
