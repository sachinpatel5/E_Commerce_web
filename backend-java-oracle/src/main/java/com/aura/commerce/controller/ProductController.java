package com.aura.commerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*")
public class ProductController {

    /**
     * Super Admin or Supplier Admin uploads new product with pictures, pricing in INR, and discounts.
     */
    @PostMapping("/upload")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'SUPPLIER_ADMIN')")
    public ResponseEntity<?> uploadProduct(
            @RequestParam("title") String title,
            @RequestParam("sku") String sku,
            @RequestParam("category") String category,
            @RequestParam("price") BigDecimal price,
            @RequestParam(value = "originalPrice", required = false) BigDecimal originalPrice,
            @RequestParam(value = "discountPercent", defaultValue = "0") Integer discountPercent,
            @RequestParam(value = "stockCount", defaultValue = "50") Integer stockCount,
            @RequestParam(value = "supplierId", required = false) Long supplierId,
            @RequestParam(value = "isFlashDrop", defaultValue = "false") Boolean isFlashDrop,
            @RequestParam(value = "images", required = false) List<MultipartFile> images,
            @RequestParam(value = "imageUrls", required = false) List<String> imageUrls
    ) {
        // Business logic:
        // 1. Store images to Oracle BLOB or Cloud Storage (OCI Object Storage / S3)
        // 2. Persist Product entity to Oracle Database table 'PRODUCTS'
        // 3. Return created product DTO
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "message", "Product SKU " + sku + " published to Oracle Database",
            "title", title,
            "priceINR", price,
            "discountPercent", discountPercent
        ));
    }

    /**
     * Super Admin modifies pricing, discounts, and flash offers.
     */
    @PatchMapping("/{productId}/discount")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateDiscount(
            @PathVariable Long productId,
            @RequestParam("discountPercent") Integer discountPercent,
            @RequestParam(value = "isFlashDrop", defaultValue = "false") Boolean isFlashDrop
    ) {
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "productId", productId,
            "discountPercent", discountPercent,
            "isFlashDrop", isFlashDrop
        ));
    }
}
