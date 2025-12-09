package com.eislop.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DeliveryDto {
    private Long id;

    @NotNull
    private Long vehicleId;

    @NotNull
    private Long driverId;

    @NotNull
    private Long purchaseOrderId;

    private LocalDate scheduledDate;

    private LocalDate deliveredDate;

    private String status;
}
