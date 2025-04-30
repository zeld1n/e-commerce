package com.bogaiciuc.e_commerce.api.controller;

import com.bogaiciuc.e_commerce.api.dto.UserResponse;
import com.bogaiciuc.e_commerce.persistence.repository.UserRepository;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.bogaiciuc.e_commerce.persistence.entity.User;



import java.time.LocalDateTime;
import java.util.Optional;




@RestController
@RequestMapping("/users") // main dir
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;


    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/add")
    public ResponseEntity<UserResponse> createUser(@RequestBody User user) {

        if (user.getFirstName().isEmpty() || user.getLastName().isEmpty() ||
                user.getAddressStreet().isEmpty() || user.getAddressZipCode().isEmpty() ||
                user.getAddressCity().isEmpty() || user.getAddressCountry().isEmpty() || user.getEmail().isEmpty()
                || user.getUsername().isEmpty() || user.getPassword().isEmpty()) {
            UserResponse responseDate = new UserResponse(false, "Data not valid", null);
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseDate);
        } else {

            if (!EmailValidator.getInstance().isValid(user.getEmail())) {
                UserResponse responseEmail = new UserResponse(false, "Email not valid", null);
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responseEmail);

            } else if (!isPasswordValid(user.getPassword())) {
                UserResponse responsePassword = new UserResponse(false, "Password not valid", null);
                return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(responsePassword);

            } else {
                user.setLastSeen(LocalDateTime.now());
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                User saved = userRepository.save(user);
                UserResponse response = new UserResponse(true, "User created successful", saved);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }
        }
    }



    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User newUser, @PathVariable int id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User existing = optionalUser.get();
            existing.setAddressStreet(newUser.getAddressStreet());
            existing.setAddressZipCode(newUser.getAddressZipCode());
            existing.setAddressCity(newUser.getAddressCity());
            existing.setAddressCountry(newUser.getAddressCountry());
            existing.setImageUrl(newUser.getImageUrl());
            existing.setLastSeen(LocalDateTime.now());

            User saved = userRepository.save(existing);
            return ResponseEntity.ok(saved);
        }

        return ResponseEntity.notFound().build();
    }

/*
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id){
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.delete(optionalUser.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
*/
@CrossOrigin(origins = "http://localhost:3000")
@PostMapping (path = "/login")
public ResponseEntity<Optional<User>> login(@RequestParam String username,@RequestParam String password) {
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isPresent()) {
        if(user.get().getPassword().equals(passwordEncoder.encode(password)))
            return ResponseEntity.ok(user);
    } else {
        return ResponseEntity.notFound().build();
    }
    return ResponseEntity.notFound().build();
}

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/updateLocalTime/{id}")
    public ResponseEntity<User> updateLocalTimeUser(@PathVariable int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existing = optionalUser.get();
            existing.setLastSeen(LocalDateTime.now());
            User saved = userRepository.save(existing);
            return ResponseEntity.ok(saved);
        }

        return ResponseEntity.notFound().build();

        }



    public static boolean isPasswordValid(String password) {
        if (password == null) {
            return false;
        }

        int MIN_LENGTH = 8;
        int MAX_LENGTH = 20;
        boolean SPECIAL_CHAR_NEEDED = false;

        String ONE_DIGIT = "(?=.*[0-9])";
        String LOWER_CASE = "(?=.*[a-z])";
        String UPPER_CASE = "(?=.*[A-Z])";
        String SPECIAL_CHAR = SPECIAL_CHAR_NEEDED ? "(?=.*[@#$%^&+=])" : "";
        String NO_SPACE = "(?=\\S+$)";
        String MIN_MAX_CHAR = ".{" + MIN_LENGTH + "," + MAX_LENGTH + "}";

        String PATTERN = ONE_DIGIT + LOWER_CASE + UPPER_CASE + SPECIAL_CHAR + NO_SPACE + MIN_MAX_CHAR;

        return password.matches(PATTERN);
    }






}
