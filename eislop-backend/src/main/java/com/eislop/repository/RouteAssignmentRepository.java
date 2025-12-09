package com.eislop.repository;

import com.eislop.entity.RouteAssignment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RouteAssignmentRepository extends MongoRepository<RouteAssignment, String> {
}
