package com.eislop.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RouteAssignmentDto {
    private Long id;

    @NotNull
    private Long deliveryId;

    private String routeDetails;

    private Double estimatedDistanceKm;

    private Double estimatedTimeHours;
}
