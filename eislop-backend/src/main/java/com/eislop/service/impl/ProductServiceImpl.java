package com.eislop.service.impl;

import com.eislop.entity.Product;
import com.eislop.repository.ProductRepository;
import com.eislop.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> findAll() { return productRepository.findAll(); }

    @Override
    public Optional<Product> findById(String id) { return productRepository.findById(id); }

    @Override
    public Optional<Product> findBySku(String sku) { return productRepository.findBySku(sku); }

    @Override
    public Product save(Product product) { return productRepository.save(product); }

    @Override
    public void deleteById(String id) { productRepository.deleteById(id); }
}
