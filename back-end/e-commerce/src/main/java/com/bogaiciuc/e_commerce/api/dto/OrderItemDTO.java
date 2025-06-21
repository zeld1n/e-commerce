package com.bogaiciuc.e_commerce.api.dto;

import com.bogaiciuc.e_commerce.persistence.entity.OrderItem;

public class OrderItemDTO {
    private Long id;
    private int quantity;
    private double price;
    private ProductDTO product;

    public OrderItemDTO(OrderItem item) {
        this.id = item.getId();
        this.quantity = item.getQuantity();
        this.price = item.getPrice();
        this.product = new ProductDTO(item.getProduct());
    }

    public Long getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getPrice() {
        return price;
    }

    public ProductDTO getProduct() {
        return product;
    }
}
