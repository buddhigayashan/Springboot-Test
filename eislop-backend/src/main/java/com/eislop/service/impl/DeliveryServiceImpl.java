package com.eislop.service.impl;

import com.eislop.entity.Delivery;
import com.eislop.repository.DeliveryRepository;
import com.eislop.service.DeliveryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryServiceImpl implements DeliveryService {
    private final DeliveryRepository deliveryRepository;

    public DeliveryServiceImpl(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    @Override
    public List<Delivery> findAll() { return deliveryRepository.findAll(); }

    @Override
    public Delivery save(Delivery delivery) { return deliveryRepository.save(delivery); }

    @Override
    public void deleteById(String id) { deliveryRepository.deleteById(id); }
}

