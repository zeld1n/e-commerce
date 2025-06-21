package com.bogaiciuc.e_commerce.api.dto;

import com.bogaiciuc.e_commerce.persistence.entity.Product;

public class ProductDTO {
    private int id;
    private String name;
    private String imageUrl;

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.imageUrl = product.getImage();
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getImageUrl() {
        return imageUrl;
    }
}
