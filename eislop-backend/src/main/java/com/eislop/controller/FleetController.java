package com.eislop.controller;

import com.eislop.entity.Vehicle;
import com.eislop.entity.Driver;
import com.eislop.entity.Delivery;
import com.eislop.service.VehicleService;
import com.eislop.service.DriverService;
import com.eislop.service.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/fleet")
public class FleetController {
    private final VehicleService vehicleService;
    private final DriverService driverService;
    private final DeliveryService deliveryService;

    public FleetController(VehicleService vehicleService,
                           DriverService driverService,
                           DeliveryService deliveryService) {
        this.vehicleService = vehicleService;
        this.driverService = driverService;
        this.deliveryService = deliveryService;
    }

    // Vehicles
    @GetMapping("/vehicles")
    public List<Vehicle> listVehicles() { return vehicleService.findAll(); }

    @PostMapping("/vehicles")
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        Vehicle saved = vehicleService.save(vehicle);
        return ResponseEntity.created(URI.create("/api/fleet/vehicles/" + saved.getId())).body(saved);
    }

    @PutMapping("/vehicles/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable String id, @RequestBody Vehicle vehicle) {
        vehicle.setId(id);
        return ResponseEntity.ok(vehicleService.save(vehicle));
    }

    @DeleteMapping("/vehicles/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String id) {
        vehicleService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Drivers
    @GetMapping("/drivers")
    public List<Driver> listDrivers() { return driverService.findAll(); }

    @PostMapping("/drivers")
    public ResponseEntity<Driver> createDriver(@RequestBody Driver driver) {
        Driver saved = driverService.save(driver);
        return ResponseEntity.created(URI.create("/api/fleet/drivers/" + saved.getId())).body(saved);
    }

    @PutMapping("/drivers/{id}")
    public ResponseEntity<Driver> updateDriver(@PathVariable String id, @RequestBody Driver driver) {
        driver.setId(id);
        return ResponseEntity.ok(driverService.save(driver));
    }

    @DeleteMapping("/drivers/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable String id) {
        driverService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Deliveries
    @GetMapping("/deliveries")
    public List<Delivery> listDeliveries() { return deliveryService.findAll(); }

    @PostMapping("/deliveries")
    public ResponseEntity<Delivery> createDelivery(@RequestBody Delivery delivery) {
        Delivery saved = deliveryService.save(delivery);
        return ResponseEntity.created(URI.create("/api/fleet/deliveries/" + saved.getId())).body(saved);
    }

    @PutMapping("/deliveries/{id}")
    public ResponseEntity<Delivery> updateDelivery(@PathVariable String id, @RequestBody Delivery delivery) {
        delivery.setId(id);
        return ResponseEntity.ok(deliveryService.save(delivery));
    }

    @DeleteMapping("/deliveries/{id}")
    public ResponseEntity<Void> deleteDelivery(@PathVariable String id) {
        deliveryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
