package com.aura.commerce.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class EmailNotificationService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${aura.super-admin.email:sachinpatel808@gmail.com}")
    private String superAdminEmail;

    /**
     * Dispatches automated order confirmation email to the Super Admin.
     */
    @Async
    public void sendOrderAlertToSuperAdmin(String orderRef, String customerName, BigDecimal totalINR, String paymentMethod) {
        String subject = "[Aura Commerce] 📦 Order " + orderRef + " Pre-Authorized (₹" + totalINR + ")";
        String htmlBody = """
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e2022;">
                <h2 style="color: #0037b0;">New Customer Order Notification: %s</h2>
                <p>Hello Super Admin (%s),</p>
                <p>A new consignment transaction was completed on the platform:</p>
                <div style="background: #f1f4ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <p><strong>Customer:</strong> %s</p>
                    <p><strong>Total Billed:</strong> ₹%s (Incl. 18%% GST)</p>
                    <p><strong>Payment Instrument:</strong> %s</p>
                    <p><strong>Courier:</strong> Bluedart Express Air Logistics</p>
                </div>
            </div>
            """.formatted(orderRef, superAdminEmail, customerName, totalINR, paymentMethod);

        dispatchEmail(superAdminEmail, subject, htmlBody);
    }

    /**
     * Dispatches low inventory alert to the Super Admin.
     */
    @Async
    public void sendLowStockAlert(String sku, String productTitle, int remainingStock, String supplierEmail) {
        String subject = "[Aura Commerce] ⚠️ Critical Low-Stock Warning: " + productTitle + " (" + remainingStock + " left)";
        String htmlBody = """
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e2022;">
                <h2 style="color: #ba1a1a;">Critical Inventory Threshold Breached</h2>
                <p>Item: <strong>%s</strong> (SKU: %s)</p>
                <p>Remaining Units: %d</p>
                <p>Vendor Contact: %s</p>
            </div>
            """.formatted(productTitle, sku, remainingStock, supplierEmail);

        dispatchEmail(superAdminEmail, subject, htmlBody);
    }

    private void dispatchEmail(String recipient, String subject, String htmlContent) {
        if (mailSender == null) {
            System.out.println("[SIMULATED EMAIL DISPATCH] To: " + recipient + " | Subject: " + subject);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            helper.setFrom("concierge@auracommerce.in");
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Email dispatch failed: " + e.getMessage());
        }
    }
}
