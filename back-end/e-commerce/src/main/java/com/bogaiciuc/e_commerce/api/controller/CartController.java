package com.bogaiciuc.e_commerce.api.controller;

import com.bogaiciuc.e_commerce.persistence.entity.Cart;
import com.bogaiciuc.e_commerce.persistence.entity.User;
import com.bogaiciuc.e_commerce.api.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestParam Long productId, @RequestParam int quantity, @RequestAttribute User user) {
        return cartService.addProductToCart(user, productId, quantity);
    }

    @GetMapping
    public Cart getCart(@RequestAttribute User user) {
        return cartService.getOrCreateCart(user);
    }

    @DeleteMapping("/clear")
    public void clearCart(@RequestAttribute User user) {
        cartService.clearCart(user);
    }

    @PutMapping("/update")
    public Cart updateQuantity(@RequestParam Long productId, @RequestParam int quantity, @RequestAttribute User user) {
        return cartService.updateCartItemQuantity(user, productId, quantity);
    }

    @DeleteMapping("/remove")
    public Cart removeFromCart(@RequestParam Long productId, @RequestAttribute User user) {
        return cartService.removeProductFromCart(user, productId);
    }




}
