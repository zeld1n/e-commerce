package com.bogaiciuc.e_commerce.api.controller;

import com.bogaiciuc.e_commerce.api.dto.OrderDTO;
import com.bogaiciuc.e_commerce.persistence.entity.Category;
import com.bogaiciuc.e_commerce.persistence.entity.Order;
import com.bogaiciuc.e_commerce.persistence.entity.Product;
import com.bogaiciuc.e_commerce.persistence.repository.OrderRepository;
import com.bogaiciuc.e_commerce.persistence.repository.UserRepository;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bogaiciuc.e_commerce.persistence.entity.User;


import java.util.List;


@RestController
@RequestMapping("/orders")// main dir
public class OrderController {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    UserRepository userRepository;

    @CrossOrigin(origins = "https://e-commerce-six-rho.vercel.app")
    @PostMapping("/add")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order saved = orderRepository.save(order);
        updateUserStats(saved.getUser().getId());
        return new ResponseEntity<Order>(saved, HttpStatus.CREATED);
        }



    @CrossOrigin(origins = "https://e-commerce-six-rho.vercel.app")
    @GetMapping("/all")
    public Page<OrderDTO> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable)
                .map(OrderDTO::new);
    }


    public void updateUserStats(Long userId) {
        Long totalSpent = orderRepository.sumTotalAmountByUserId(userId);
        int totalOrders = orderRepository.countByUserId(userId);

        User user = userRepository.findById(Math.toIntExact(userId)).orElseThrow();
        user.setSpent(totalSpent != null ? totalSpent : 0L);
        user.setNumOrders(totalOrders);
        userRepository.save(user);
    }


    @CrossOrigin(origins = "https://e-commerce-six-rho.vercel.app")
    @GetMapping("/allTEST")
    public List<Order> getAllOrdersTEST() {
        return  orderRepository.findAll();
    }







    @CrossOrigin(origins = "https://e-commerce-six-rho.vercel.app")
    @GetMapping("/total_amount")
    public ResponseEntity<Double> getTotal_amount(Order order) {
        return ResponseEntity.status(200).body(orderRepository.getTotalAmount());
    }





}
