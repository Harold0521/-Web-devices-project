package com.example.test_java_maven.model;

import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "devices")
public class Devices {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String product_name;
    private Integer quantity;
    private String reference;
    private String image_reference;
    private Float price;

    public Devices() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getImage_reference() {
        return "/images/" + this.image_reference;
    }

    public void setImage_reference(String image_reference) {
        this.image_reference = image_reference;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    @OneToMany(mappedBy = "device", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comments> comments;

}