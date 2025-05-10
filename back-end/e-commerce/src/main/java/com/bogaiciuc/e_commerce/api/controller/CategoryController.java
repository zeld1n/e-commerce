package com.bogaiciuc.e_commerce.api.controller;

import com.bogaiciuc.e_commerce.persistence.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<String> getAllCategoryNames() {
        return categoryRepository.findAllCategoryNames();
    }
}

