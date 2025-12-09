package com.eislop.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class PurchaseOrderDto {
    private Long id;

    @NotNull
    private Long productId;

    @NotNull
    private Long supplierId;

    @NotNull
    @PositiveOrZero
    private Integer quantity;

    private BigDecimal totalCost;

    private LocalDate expectedDeliveryDate;

    private String status;
}
