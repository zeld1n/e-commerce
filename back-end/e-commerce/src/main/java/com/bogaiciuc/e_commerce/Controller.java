package com.bogaiciuc.e_commerce;
import com.bogaiciuc.e_commerce.model.Product;
import com.bogaiciuc.e_commerce.model.ProductRepository;
import com.bogaiciuc.e_commerce.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;


@RestController
public class Controller  {

    @RequestMapping(path="/product")
    public  List<Product> productList(){
        String url = ("https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg");

        return Arrays.asList(new Product(1,10,"Giorgio",100,url),new Product(2,100,"Simone",10,url));
    }
        ProductRepository productRepository;

        @PostMapping("/add")
        @ResponseBody
        public String addNewProduct(@RequestBody Product product) {
            return "Product saved with ID: ";
        }

/*
    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();


    }
*/

}
