package com.bogaiciuc.e_commerce.model;

public class Product {
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
