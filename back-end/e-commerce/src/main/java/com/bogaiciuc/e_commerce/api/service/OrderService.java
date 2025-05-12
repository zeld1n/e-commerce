package com.bogaiciuc.e_commerce.api.service;


import com.bogaiciuc.e_commerce.persistence.entity.*;
import com.bogaiciuc.e_commerce.persistence.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;

    public OrderService(OrderRepository orderRepository, CartService cartService) {
        this.orderRepository = orderRepository;
        this.cartService = cartService;
    }

    public Order createOrderFromCart(User user) {
        Cart cart = cartService.getOrCreateCart(user);
        Order order = new Order();
        order.setUser(user);
        order.setStatus("PENDING");

        List<OrderItem> items = cart.getItems().stream().map(cartItem -> {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            return orderItem;
        }).collect(Collectors.toList());

        order.setItems(items);
        order.setTotalAmount(items.stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum());

        Order saved = orderRepository.save(order);
        cartService.clearCart(user);

        return saved;
    }
}
