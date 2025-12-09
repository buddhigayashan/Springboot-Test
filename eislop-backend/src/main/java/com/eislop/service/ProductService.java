package com.eislop.service;

import com.eislop.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<Product> findAll();
    Optional<Product> findById(String id);
    Optional<Product> findBySku(String sku);
    Product save(Product product);
    void deleteById(String id);
}
