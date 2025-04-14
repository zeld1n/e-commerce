package com.bogaiciuc.e_commerce;
import com.bogaiciuc.e_commerce.persistence.entity.Product;
import com.bogaiciuc.e_commerce.persistence.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/products")// main dir
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Product> getAllUsers() {
        return productRepository.findAll();
    }

    // POST-запрос для добавления нового продукта
    @PostMapping("/add")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        if(product.getName().isEmpty() || product.getPrice()<=0 || product.getQuantity()<=0 || product.getimage().isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(product);
        }else {
            Product saved = productRepository.save(product);
            return new ResponseEntity<Product>(saved, HttpStatus.CREATED);
        }
    }
}


/*
    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();


    }
*/


