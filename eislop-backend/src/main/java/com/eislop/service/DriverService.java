package com.eislop.service;

import com.eislop.entity.Driver;
import java.util.List;

public interface DriverService {
    List<Driver> findAll();
    Driver save(Driver driver);
    void deleteById(String id);
}

