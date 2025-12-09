package com.eislop.service.impl;

import com.eislop.entity.Driver;
import com.eislop.repository.DriverRepository;
import com.eislop.service.DriverService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverServiceImpl implements DriverService {
    private final DriverRepository driverRepository;

    public DriverServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @Override
    public List<Driver> findAll() { return driverRepository.findAll(); }

    @Override
    public Driver save(Driver driver) { return driverRepository.save(driver); }

    @Override
    public void deleteById(String id) { driverRepository.deleteById(id); }
}

