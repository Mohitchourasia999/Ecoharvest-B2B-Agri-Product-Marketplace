package com.ecoharvest.service;

import com.ecoharvest.entity.Order;
import com.ecoharvest.entity.Product;
import com.ecoharvest.entity.User;
import com.ecoharvest.repository.OrderRepository;
import com.ecoharvest.repository.ProductRepository;
import com.ecoharvest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Purpose: Business logic for order operations.
 * Handles placing orders and retrieving order lists.
 */
@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Place a new order.
     * Finds the product and buyer, calculates total price,
     * reduces product quantity, and saves the order.
     */
    public Order placeOrder(Long productId, Long buyerId, int quantity) {
        if (productId == null || buyerId == null) {
            return null;
        }

        Product product = productRepository.findById(productId).orElse(null);
        User buyer = userRepository.findById(buyerId).orElse(null);

        if (product == null || buyer == null) {
            return null;
        }

        // Validate quantity
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be at least 1");
        }

        // Validate stock availability
        if (product.getQuantity() < quantity) {
            throw new IllegalArgumentException("Insufficient stock available. Only " + product.getQuantity() + " units left.");
        }

        // Reduce product quantity
        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);

        // Create and save the order
        Order order = new Order();
        order.setProduct(product);
        order.setBuyer(buyer);
        order.setQuantity(quantity);
        order.setTotalPrice(product.getPrice() * quantity);
        order.setOrderDate(LocalDateTime.now());

        return orderRepository.save(order);
    }

    /** Get all orders - used by ADMIN */
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /** Get orders by buyer ID - used by BUYER to view own orders */
    public List<Order> getOrdersByBuyerId(Long buyerId) {
        return orderRepository.findByBuyerId(buyerId);
    }
}
