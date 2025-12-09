package com.eislop.service;

import com.eislop.entity.Delivery;
import java.util.List;

public interface DeliveryService {
    List<Delivery> findAll();
    Delivery save(Delivery delivery);
    void deleteById(String id);
}

