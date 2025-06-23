package com.bogaiciuc.e_commerce.persistence.repository;

import com.bogaiciuc.e_commerce.persistence.entity.Order;
import com.bogaiciuc.e_commerce.persistence.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT SUM(o.totalAmount) FROM Order o")
    Double getTotalAmount();

    Page<Order> findByStatus(String status, Pageable pageable);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.user.id = :userId")
    int countByUserId(@Param("userId") Long userId);

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.user.id = :userId")
    Long sumTotalAmountByUserId(@Param("userId") Long userId);

}
