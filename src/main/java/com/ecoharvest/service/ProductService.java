package com.ecoharvest.service;

import com.ecoharvest.entity.Product;
import com.ecoharvest.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Purpose: Business logic for product operations (CRUD).
 * 
 * @Service marks this as a Spring service component.
 * @Autowired injects the repository automatically.
 */
@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    /** Get all products - used by all roles */
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    /** Get product by ID */
    public Product getProductById(Long id) {
        if (id == null) {
            return null;
        }
        return productRepository.findById(id).orElse(null);
    }

    /** Get products by seller ID - used by SELLER to view own products */
    public List<Product> getProductsBySellerId(Long sellerId) {
        if (sellerId == null) {
            return java.util.Collections.emptyList();
        }
        return productRepository.findBySellerId(sellerId);
    }

    /** Add a new product */
    public Product addProduct(Product product) {
        if (product == null) {
            return null;
        }
        return productRepository.save(product);
    }

    /** Update an existing product */
    public Product updateProduct(Long id, Product updatedProduct) {
        if (id == null) {
            return null;
        }
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            product.setName(updatedProduct.getName());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            product.setQuantity(updatedProduct.getQuantity());
            return productRepository.save(product);
        }
        return null;
    }

    /** Delete a product by ID */
    public void deleteProduct(Long id) {
        if (id != null) {
            productRepository.deleteById(id);
        }
    }
}
