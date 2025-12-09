package com.eislop.controller;

import com.eislop.entity.Product;
import com.eislop.entity.Supplier;
import com.eislop.entity.PurchaseOrder;
import com.eislop.service.ProductService;
import com.eislop.service.SupplierService;
import com.eislop.service.PurchaseOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/supply")
public class SupplyController {
    private final ProductService productService;
    private final SupplierService supplierService;
    private final PurchaseOrderService purchaseOrderService;

    public SupplyController(ProductService productService,
                            SupplierService supplierService,
                            PurchaseOrderService purchaseOrderService) {
        this.productService = productService;
        this.supplierService = supplierService;
        this.purchaseOrderService = purchaseOrderService;
    }

    // Products
    @GetMapping("/products")
    public List<Product> listProducts() { return productService.findAll(); }

    @PostMapping("/products")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product saved = productService.save(product);
        return ResponseEntity.created(URI.create("/api/supply/products/" + saved.getId())).body(saved);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        product.setId(id);
        return ResponseEntity.ok(productService.save(product));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Suppliers
    @GetMapping("/suppliers")
    public List<Supplier> listSuppliers() { return supplierService.findAll(); }

    @PostMapping("/suppliers")
    public ResponseEntity<Supplier> createSupplier(@RequestBody Supplier supplier) {
        Supplier saved = supplierService.save(supplier);
        return ResponseEntity.created(URI.create("/api/supply/suppliers/" + saved.getId())).body(saved);
    }

    @PutMapping("/suppliers/{id}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable String id, @RequestBody Supplier supplier) {
        supplier.setId(id);
        return ResponseEntity.ok(supplierService.save(supplier));
    }

    @DeleteMapping("/suppliers/{id}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable String id) {
        supplierService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Purchase Orders
    @GetMapping("/purchase-orders")
    public List<PurchaseOrder> listPurchaseOrders() { return purchaseOrderService.findAll(); }

    @PostMapping("/purchase-orders")
    public ResponseEntity<PurchaseOrder> createPurchaseOrder(@RequestBody PurchaseOrder po) {
        PurchaseOrder saved = purchaseOrderService.save(po);
        return ResponseEntity.created(URI.create("/api/supply/purchase-orders/" + saved.getId())).body(saved);
    }

    @PutMapping("/purchase-orders/{id}")
    public ResponseEntity<PurchaseOrder> updatePurchaseOrder(@PathVariable String id, @RequestBody PurchaseOrder po) {
        po.setId(id);
        return ResponseEntity.ok(purchaseOrderService.save(po));
    }

    @DeleteMapping("/purchase-orders/{id}")
    public ResponseEntity<Void> deletePurchaseOrder(@PathVariable String id) {
        purchaseOrderService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
