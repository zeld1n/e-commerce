package com.bogaiciuc.e_commerce.persistence.repository;

import com.bogaiciuc.e_commerce.persistence.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Product> findByNameContainingIgnoreCaseAndCategoryNameIgnoreCase(String name, String category, Pageable pageable);


}
