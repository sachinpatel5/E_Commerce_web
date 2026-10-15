# Aura Commerce - Java 21 & Oracle Database 23c Enterprise Backend

This directory contains the production-grade **Java 21 (Spring Boot 3.3)** backend and **Oracle Database 23c / 19c** relational schema designed specifically for the multi-vendor **Aura Commerce** platform.

## 🚀 Key Architectural Features
1. **Multi-Vendor Role-Based Access Control (RBAC)**:
   - `ROLE_SUPER_ADMIN`: Full governance, supplier onboarding, pricing, discounts, and email alerts.
   - `ROLE_SUPPLIER_ADMIN`: Vendor portal access to upload and sell products, manage stock, and track payouts.
   - `ROLE_CUSTOMER`: Checkout, UPI/Card payment, and live GPS order tracking.
2. **Oracle Database 23c Schema**:
   - `USERS`, `ROLES`, `SUPPLIERS`, `PRODUCTS`, `PRODUCT_IMAGES`, `OFFERS`, `ORDERS`, `ORDER_ITEMS`, `EMAIL_NOTIFICATIONS`.
   - Sequences, foreign keys, decimal precision in Indian Rupee (`₹`), and timestamps.
3. **Automated Super Admin Email Engine**:
   - Powered by Spring Boot `JavaMailSender` and asynchronous `@Async` executor.
   - Automatically routes new orders, stock alerts, and vendor signups to `sachinpatel808@gmail.com`.

---

## 🛠️ Quick Local Setup

### 1. Start Oracle Database 23c Free Container
```bash
cd backend-java-oracle
docker compose up -d
```
This spins up:
- **Oracle Database 23c Free** on port `1521` (PDB: `FREEPDB1`, User: `system`, Password: `AuraSecret2025`).
- The database automatically runs `schema-oracle.sql` on first boot.
- **Mailpit Web UI** on `http://localhost:8025` for previewing outgoing emails.

### 2. Run the Java 21 Spring Boot Backend
Ensure JDK 21 is installed (`java -version`):
```bash
mvn clean install
mvn spring-boot:run
```
The REST API starts on **`http://localhost:8080`**.

### 3. Swagger OpenAPI Documentation
Open **`http://localhost:8080/swagger-ui.html`** to test all endpoints interactively.

### 4. Connect the React Vite Frontend
In the root `.env` or development environment:
```env
VITE_API_URL="http://localhost:8080/api/v1"
```
The React frontend will communicate directly with your Java 21 + Oracle DB backend.
