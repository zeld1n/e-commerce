package com.bogaiciuc.e_commerce.persistence.repository;

import com.bogaiciuc.e_commerce.persistence.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT name FROM Category")
    List<String> findAllCategoryNames();
}
