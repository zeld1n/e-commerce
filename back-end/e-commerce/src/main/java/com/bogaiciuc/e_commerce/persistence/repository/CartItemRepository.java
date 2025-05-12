package com.bogaiciuc.e_commerce.persistence.repository;


import com.bogaiciuc.e_commerce.persistence.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
