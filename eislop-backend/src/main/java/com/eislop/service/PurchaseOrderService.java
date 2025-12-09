package com.eislop.service;

import com.eislop.entity.PurchaseOrder;
import java.util.List;

public interface PurchaseOrderService {
    List<PurchaseOrder> findAll();
    PurchaseOrder save(PurchaseOrder po);
    void deleteById(String id);
}

