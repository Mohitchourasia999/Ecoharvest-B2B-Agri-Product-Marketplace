package com.ecoharvest.entity;

import jakarta.persistence.*;

/**
 * Purpose: JPA Entity mapped to the "products" table.
 * Each product is linked to a seller (User) via seller_id foreign key.
 * 
 * @ManyToOne creates a many-to-one relationship with User.
 * @JoinColumn specifies the foreign key column name.
 */
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private Integer quantity;

    // Many products can belong to one seller
    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    // Default constructor required by JPA
    public Product() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public User getSeller() { return seller; }
    public void setSeller(User seller) { this.seller = seller; }
}
