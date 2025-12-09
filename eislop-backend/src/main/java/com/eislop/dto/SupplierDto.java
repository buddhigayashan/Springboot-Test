package com.eislop.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplierDto {
    private Long id;

    @NotBlank
    private String name;

    private String contactName;

    @Email
    private String contactEmail;

    private String contactPhone;

    private String address;

    private boolean active;
}
