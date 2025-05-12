package com.bogaiciuc.e_commerce.persistence.repository;


import com.bogaiciuc.e_commerce.persistence.entity.Cart;
import com.bogaiciuc.e_commerce.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
