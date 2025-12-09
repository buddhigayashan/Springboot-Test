package com.eislop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverDto {
    private Long id;

    @NotBlank
    private String name;

    private String licenseNumber;

    private String contactNumber;

    private Boolean available;
}
