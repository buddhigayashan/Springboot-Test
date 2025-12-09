package com.eislop.service.impl;

import com.eislop.entity.PurchaseOrder;
import com.eislop.repository.PurchaseOrderRepository;
import com.eislop.service.PurchaseOrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseOrderServiceImpl implements PurchaseOrderService {
    private final PurchaseOrderRepository purchaseOrderRepository;

    public PurchaseOrderServiceImpl(PurchaseOrderRepository purchaseOrderRepository) {
        this.purchaseOrderRepository = purchaseOrderRepository;
    }

    @Override
    public List<PurchaseOrder> findAll() { return purchaseOrderRepository.findAll(); }

    @Override
    public PurchaseOrder save(PurchaseOrder po) { return purchaseOrderRepository.save(po); }

    @Override
    public void deleteById(String id) { purchaseOrderRepository.deleteById(id); }
}

