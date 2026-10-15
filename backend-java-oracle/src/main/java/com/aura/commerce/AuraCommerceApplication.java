package com.aura.commerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Aura Commerce Enterprise Java 21 + Oracle Database Multi-Vendor Engine.
 * Supports Super Admin governance, Supplier Admin access delegation, and automated email alerts.
 */
@SpringBootApplication
@EnableAsync
public class AuraCommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuraCommerceApplication.class, args);
    }
}
