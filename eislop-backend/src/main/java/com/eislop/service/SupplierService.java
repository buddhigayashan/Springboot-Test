package com.eislop.service;

import com.eislop.entity.Supplier;

import java.util.List;
import java.util.Optional;

public interface SupplierService {
    List<Supplier> findAll();
    Optional<Supplier> findById(String id);
    Supplier save(Supplier supplier);
    void deleteById(String id);
}
