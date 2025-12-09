package com.eislop.service.impl;

import com.eislop.entity.Supplier;
import com.eislop.repository.SupplierRepository;
import com.eislop.service.SupplierService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {
    private final SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public List<Supplier> findAll() { return supplierRepository.findAll(); }

    @Override
    public Optional<Supplier> findById(String id) { return supplierRepository.findById(id); }

    @Override
    public Supplier save(Supplier supplier) { return supplierRepository.save(supplier); }

    @Override
    public void deleteById(String id) { supplierRepository.deleteById(id); }
}
