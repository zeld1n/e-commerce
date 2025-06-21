package com.bogaiciuc.e_commerce.api.dto;

import com.bogaiciuc.e_commerce.persistence.entity.Order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDTO {
    private Long id;
    private LocalDateTime createdAt;
    private String status;
    private double totalAmount;
    private UserDTO user;
    private List<OrderItemDTO> items;

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.createdAt = order.getCreatedAt();
        this.status = order.getStatus();
        this.totalAmount = order.getTotalAmount();
        this.user = new UserDTO(order.getUser());
        this.items = order.getItems()
                .stream()
                .map(OrderItemDTO::new)
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getStatus() {
        return status;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public UserDTO getUser() {
        return user;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }
}
