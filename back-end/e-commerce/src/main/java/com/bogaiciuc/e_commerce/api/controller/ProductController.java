package com.bogaiciuc.e_commerce.api.controller;
import com.bogaiciuc.e_commerce.persistence.entity.Category;
import com.bogaiciuc.e_commerce.persistence.entity.Product;
import com.bogaiciuc.e_commerce.persistence.repository.CategoryRepository;
import com.bogaiciuc.e_commerce.persistence.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bogaiciuc.e_commerce.api.dto.ProductPageResponse;

import java.util.Optional;


@RestController
@RequestMapping("/products")// main dir
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping(path = "/all")
    public ProductPageResponse getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(required = false) String category
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ?
                Sort.by(sortBy).descending() :
                Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> productPage;

        if (category != null && !category.isBlank()) {
            productPage = productRepository.findByNameContainingIgnoreCaseAndCategoryNameIgnoreCase(search, category, pageable);
        } else {
            productPage = productRepository.findByNameContainingIgnoreCase(search, pageable);
        }

        return new ProductPageResponse(productPage.getContent(), productPage.getTotalPages());
    }


    @Autowired
    CategoryRepository categoryRepository;
    @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        if (product.getName().isEmpty() || product.getPrice() <= 0 || product.getQuantity() <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(product);
        } else {

            Long categoryId = product.getCategory().getId();
            Category category = categoryRepository.findById(categoryId)
                    .orElse(null);

            if (category == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }

            product.setCategory(category);

            Product saved = productRepository.save(product);
            return new ResponseEntity<Product>(saved, HttpStatus.CREATED);
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product newProduct, @PathVariable long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product existing = optionalProduct.get();
            existing.setName(newProduct.getName());
            existing.setImage(newProduct.getImage());
            existing.setPrice(newProduct.getPrice());
            existing.setQuantity(newProduct.getQuantity());

            Product saved = productRepository.save(existing);
            return ResponseEntity.ok(saved);
        }

        return ResponseEntity.notFound().build();
    }


    @PutMapping("/updateInactive/{id}")
    public ResponseEntity<Product> updateInactiveProd(@PathVariable long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
            if(optionalProduct.isPresent()) {
                Product existing = optionalProduct.get();
                existing.setStatus(Product.ProductStatus.INACTIVE);

                Product saved = productRepository.save(existing);
                return ResponseEntity.ok(saved);
            }
        return ResponseEntity.notFound().build();

    }


    @PutMapping("/updateActive/{id}")
    public ResponseEntity<Product> updateActiveProd(@PathVariable long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if(optionalProduct.isPresent()) {
            Product existing = optionalProduct.get();
            existing.setStatus(Product.ProductStatus.ACTIVE);

            Product saved = productRepository.save(existing);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();

    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable long id){
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            productRepository.delete(optionalProduct.get());

            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping(path = "/get/{id}")
    public ResponseEntity<Optional<Product>> getProduct(@PathVariable long id){
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()){
            return ResponseEntity.ok(product);
        }else{
            return ResponseEntity.notFound().build();

        }
    }

}