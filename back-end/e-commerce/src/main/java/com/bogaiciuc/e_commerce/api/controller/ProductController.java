package com.bogaiciuc.e_commerce.api.controller;
import com.bogaiciuc.e_commerce.persistence.entity.Product;
import com.bogaiciuc.e_commerce.persistence.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/products")// main dir
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        if (product.getName().isEmpty() || product.getPrice() <= 0 || product.getQuantity() <= 0 || product.getimage().isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(product);
        } else {
            Product saved = productRepository.save(product);
            return new ResponseEntity<Product>(saved, HttpStatus.CREATED);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product newProduct, @PathVariable int id) {
        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isPresent()) {
            Product existing = optionalProduct.get();
            existing.setName(newProduct.getName());
            existing.setImage(newProduct.getimage());
            existing.setPrice(newProduct.getPrice());
            existing.setQuantity(newProduct.getQuantity());

            Product saved = productRepository.save(existing);
            return ResponseEntity.ok(saved);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable int id){
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            productRepository.delete(optionalProduct.get());

            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping(path = "/get/{id}")
    public ResponseEntity<Optional<Product>> getProduct(@PathVariable int id){
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()){
            return ResponseEntity.ok(product);
        }else{
            return ResponseEntity.notFound().build();

        }
    }

}