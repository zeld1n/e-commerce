package com.bogaiciuc.e_commerce.api.controller;

import com.bogaiciuc.e_commerce.persistence.entity.Category;
import com.bogaiciuc.e_commerce.persistence.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "https://e-commerce-six-rho.vercel.app")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<String> getAllCategoryNames() {
        return categoryRepository.findAllCategoryNames();
    }

    @GetMapping("/AllInfoCat")
    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }






}

