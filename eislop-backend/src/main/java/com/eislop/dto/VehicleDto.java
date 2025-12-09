package com.eislop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VehicleDto {
    private Long id;

    @NotBlank
    private String vehicleNumber;

    private String model;

    private Integer capacity;

    @NotNull
    private Boolean active;
}
