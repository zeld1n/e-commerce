package com.bogaiciuc.e_commerce.persistence.repository;

import com.bogaiciuc.e_commerce.persistence.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.bogaiciuc.e_commerce.persistence.entity.Product;



@Repository
public interface ProductRepository  extends JpaRepository<Product, Integer> {

}