package com.ecoharvest.controller;

import com.ecoharvest.entity.Product;
import com.ecoharvest.entity.User;
import com.ecoharvest.service.ProductService;
import com.ecoharvest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Purpose: REST API endpoints for product operations (CRUD).
 * 
 * GET /api/products       - All users can view products
 * GET /api/products/{id}  - Get single product
 * GET /api/products/seller - Seller views own products
 * POST /api/products      - Seller adds product
 * PUT /api/products/{id}  - Seller updates product
 * DELETE /api/products/{id} - Seller deletes product
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    /** GET all products - accessible by all authenticated users */
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    /** GET single product by ID */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

    /** GET seller's own products */
    @GetMapping("/seller")
    public List<Product> getSellerProducts() {
        User seller = getCurrentUser();
        return productService.getProductsBySellerId(seller.getId());
    }

    /** POST - Add new product (SELLER only, enforced by SecurityConfig) */
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        User seller = getCurrentUser();
        product.setSeller(seller);
        return productService.addProduct(product);
    }

    /** PUT - Update product (SELLER only) */
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updated = productService.updateProduct(id, product);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    /** DELETE - Delete product (SELLER only) */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    /**
     * Helper: Gets the currently logged-in user from SecurityContext.
     * SecurityContext stores the authentication after login.
     */
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userService.findByEmail(auth.getName());
    }
}
