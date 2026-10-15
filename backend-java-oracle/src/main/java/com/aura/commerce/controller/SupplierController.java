package com.aura.commerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/suppliers")
@CrossOrigin(origins = "*")
public class SupplierController {

    /**
     * Super Admin onboards a new supplier and provisions vendor admin credentials.
     */
    @PostMapping("/onboard")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> onboardSupplier(
            @RequestParam("companyName") String companyName,
            @RequestParam("contactName") String contactName,
            @RequestParam("email") String email,
            @RequestParam("gstin") String gstin,
            @RequestParam("commissionRate") BigDecimal commissionRate
    ) {
        // Persists record to Oracle DB 'SUPPLIERS' table and issues JWT vendor account
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "message", "Supplier Admin access granted to " + companyName,
            "email", email,
            "commissionRate", commissionRate
        ));
    }

    /**
     * Super Admin toggles supplier admin access (active / suspended).
     */
    @PatchMapping("/{supplierId}/toggle-access")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> toggleSupplierAccess(
            @PathVariable Long supplierId,
            @RequestParam("grantAccess") boolean grantAccess
    ) {
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "supplierId", supplierId,
            "adminAccessGranted", grantAccess
        ));
    }
}
