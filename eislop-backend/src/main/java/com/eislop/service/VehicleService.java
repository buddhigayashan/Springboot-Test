package com.eislop.service;

import com.eislop.entity.Vehicle;
import java.util.List;

public interface VehicleService {
    List<Vehicle> findAll();
    Vehicle save(Vehicle vehicle);
    void deleteById(String id);
}

