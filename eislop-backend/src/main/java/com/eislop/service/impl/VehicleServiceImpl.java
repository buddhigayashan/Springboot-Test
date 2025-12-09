package com.eislop.service.impl;

import com.eislop.entity.Vehicle;
import com.eislop.repository.VehicleRepository;
import com.eislop.service.VehicleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {
    private final VehicleRepository vehicleRepository;

    public VehicleServiceImpl(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public List<Vehicle> findAll() { return vehicleRepository.findAll(); }

    @Override
    public Vehicle save(Vehicle vehicle) { return vehicleRepository.save(vehicle); }

    @Override
    public void deleteById(String id) { vehicleRepository.deleteById(id); }
}

