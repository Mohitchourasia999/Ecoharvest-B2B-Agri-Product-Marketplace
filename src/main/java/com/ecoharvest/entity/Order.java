package com.ecoharvest.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Purpose: JPA Entity mapped to the "orders" table.
 * Each order links a buyer (User) to a product (Product).
 * 
 * @ManyToOne creates relationships with Product and User (buyer).
 * orderDate is auto-set to current time when order is created.
 */
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many orders can reference one product
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // Many orders can belong to one buyer
    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    private Integer quantity;

    private LocalDateTime orderDate;

    private Double totalPrice;

    // Default constructor required by JPA
    public Order() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public User getBuyer() { return buyer; }
    public void setBuyer(User buyer) { this.buyer = buyer; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }
}
