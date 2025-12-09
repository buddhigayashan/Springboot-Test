package com.eislop.repository;

import com.eislop.entity.Delivery;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DeliveryRepository extends MongoRepository<Delivery, String> {
    Optional<Delivery> findByReference(String reference);
}
