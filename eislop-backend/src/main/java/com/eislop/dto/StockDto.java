package com.eislop.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockDto {
    private Long id;

    @NotNull
    private Long productId;

    @NotNull
    @PositiveOrZero
    private Integer quantityAvailable;

    private Integer reorderLevel;

    private Integer reorderQuantity;
}
