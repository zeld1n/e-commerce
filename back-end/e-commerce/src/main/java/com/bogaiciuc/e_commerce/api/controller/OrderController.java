package com.bogaiciuc.e_commerce.api.controller;

import com.bogaiciuc.e_commerce.persistence.entity.Order;
import com.bogaiciuc.e_commerce.persistence.repository.OrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/orders")// main dir
public class OrderController {
    @Autowired
    OrderRepository orderRepository;


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/all")
    public Page<Order> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/total_amount")
    public ResponseEntity<Double> getTotal_amount(Order order) {
        return ResponseEntity.status(200).body(orderRepository.getTotalAmount());
    }





}
