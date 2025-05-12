package com.bogaiciuc.e_commerce.api.service;

import com.bogaiciuc.e_commerce.persistence.entity.*;
import com.bogaiciuc.e_commerce.persistence.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    public CartService(CartRepository cartRepository, ProductRepository productRepository, CartItemRepository cartItemRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
    }

    public Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        });
    }

    public Cart addProductToCart(User user, Long productId, int quantity) {
        Cart cart = getOrCreateCart(user);
        Product product = productRepository.findById(productId).orElseThrow();

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setQuantity(quantity);

        cart.getItems().add(item);
        return cartRepository.save(cart);
    }

    public void clearCart(User user) {
        Cart cart = getOrCreateCart(user);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    public Cart updateCartItemQuantity(User user, Long productId, int quantity) {
        Cart cart = getOrCreateCart(user);
        for (CartItem item : cart.getItems()) {
            if (item.getProduct().getId()==(productId)) {
                item.setQuantity(quantity);
                cartItemRepository.save(item);
                break;
            }
        }
        return cartRepository.save(cart);
    }

    public Cart removeProductFromCart(User user, Long productId) {
        Cart cart = getOrCreateCart(user);
        cart.getItems().removeIf(item -> {
            if (item.getProduct().getId()==(productId)) {
                cartItemRepository.delete(item);
                return true;
            }
            return false;
        });
        return cartRepository.save(cart);
    }


}
