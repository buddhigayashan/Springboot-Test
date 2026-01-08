package com.eislop.config;

import com.eislop.entity.*;
import com.eislop.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner seedMongo(
            UserRepository userRepository,
            ProductRepository productRepository,
            SupplierRepository supplierRepository,
            VehicleRepository vehicleRepository,
            DriverRepository driverRepository,
            DeliveryRepository deliveryRepository,
            PurchaseOrderRepository purchaseOrderRepository,
            RouteAssignmentRepository routeAssignmentRepository,
            StockRepository stockRepository
    ) {
        return args -> {
            // Users
            if (userRepository.count() == 0) {
                User admin = User.builder()
                        .name("Admin User")
                        .email("admin@eislop.local")
                        .password("changeme")
                        .build();
                userRepository.save(admin);
            }

            // Suppliers
            if (supplierRepository.count() == 0) {
                Supplier s = Supplier.builder()
                        .name("Acme Supplies")
                        .email("contact@acme.example")
                        .phone("+1-555-1000")
                        .leadTimeDays(7)
                        .build();
                supplierRepository.save(s);
            }

            // Products
            if (productRepository.count() == 0) {
                Product p = Product.builder()
                        .name("Widget A")
                        .sku("WIDGET-A")
                        .category("Widgets")
                        .price(19.99)
                        .build();
                productRepository.save(p);
            }

            // Vehicles
            if (vehicleRepository.count() == 0) {
                Vehicle v = Vehicle.builder()
                        .registrationNumber("ABC-1234")
                        .type("Van")
                        .capacityKg(1200)
                        .status("AVAILABLE")
                        .build();
                vehicleRepository.save(v);
            }

            // Drivers
            if (driverRepository.count() == 0) {
                Driver d = Driver.builder()
                        .name("John Doe")
                        .email("john@example.com")
                        .phone("+1-555-2000")
                        .licenseNumber("D-1234567")
                        .hireDate(LocalDate.now().minusYears(1))
                        .build();
                driverRepository.save(d);
            }

            // Deliveries
            if (deliveryRepository.count() == 0) {
                Delivery del = Delivery.builder()
                        .reference("DEL-0001")
                        .customer("Contoso")
                        .status("PLANNED")
                        .plannedDate(LocalDate.now().plusDays(3))
                        .latitude(12.9716)
                        .longitude(77.5946)
                        .build();
                deliveryRepository.save(del);
            }

            // Purchase Orders
            if (purchaseOrderRepository.count() == 0) {
                PurchaseOrder po = PurchaseOrder.builder()
                        .orderNumber("PO-0001")
                        .supplier("Acme Supplies")
                        .status("OPEN")
                        .totalAmount(299.99)
                        .expectedDate(LocalDate.now().plusDays(10))
                        .build();
                purchaseOrderRepository.save(po);
            }

            // Stock
            if (stockRepository.count() == 0) {
                Stock st = Stock.builder()
                        .productId(productRepository.findAll().get(0).getId())
                        .quantityOnHand(100)
                        .reorderLevel(20)
                        .build();
                stockRepository.save(st);
            }
        };
    }
}
