package com.eislop.repository;

import com.eislop.entity.PurchaseOrder;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PurchaseOrderRepository extends MongoRepository<PurchaseOrder, String> {
    Optional<PurchaseOrder> findByOrderNumber(String orderNumber);
}
