package com.bogaiciuc.e_commerce.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;
    private String name;
    private float price;
    private int quantity;

    private String image;

    public Product() {
    }



    public Product(int id, float price, String name, int quantity, String image) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.quantity = quantity;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public float getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getimage() {
        return image;
    }

}
