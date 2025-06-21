package com.bogaiciuc.e_commerce.api.controller;

import com.bogaiciuc.e_commerce.api.dto.LoginRequest;
import com.bogaiciuc.e_commerce.api.dto.UserResponse;
import com.bogaiciuc.e_commerce.persistence.entity.Session;
import com.bogaiciuc.e_commerce.persistence.repository.SessionRepository;
import com.bogaiciuc.e_commerce.persistence.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.bogaiciuc.e_commerce.persistence.entity.User;


import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/users") // main dir
public class UserController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SessionRepository sessionRepository;



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
                user.setRole("user");
                User saved = userRepository.save(user);
                UserResponse response = new UserResponse(true, "User created successful", saved);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            }
        }
    }



        @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
        @GetMapping("/check_session")
        public ResponseEntity<?> checkSession(@CookieValue(value = "session", required = false) String sessionId) {
            if (sessionId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No session"));
            }

            Optional<Session> session = sessionRepository.findBySessionId(sessionId);
            if (session.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid session"));
            }

            Optional<User> user = userRepository.findById(session.get().getUserId());
            if (user.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not found"));
            }

            return ResponseEntity.ok(Map.of("username", user.get().getUsername(), "role", user.get().getRole()));
        }


    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping("/logout")
        public ResponseEntity<?> logout(@CookieValue(value = "session", required = false) String sessionId,HttpServletResponse response) {
            ResponseCookie cookie = ResponseCookie.from("session", "")
                    .httpOnly(true)
                    .path("/")
                    .maxAge(0)
                    .build();

            Optional<Session> session = sessionRepository.findBySessionId(sessionId);
            if (session.isPresent()) {
                sessionRepository.delete(session.get());
            }

        response.setHeader("Set-Cookie", cookie.toString());

            return ResponseEntity.ok().build();
        }



    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @GetMapping("/auth/user-role")
    public ResponseEntity<?> getUserRole(@CookieValue(value = "session", required = false) String sessionId) {
        if (sessionId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No session found"));
        }

        Optional<Session> session = sessionRepository.findBySessionId(sessionId);
        if (session.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid session"));
        }

        Optional<User> user = userRepository.findById(session.get().getUserId());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not found"));
        }

        String role = user.get().getRole(); 
        return ResponseEntity.ok(Map.of("role", role));
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


    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.delete(optionalUser.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    @PostMapping(path = "/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginRequest loginRequest,
            HttpServletResponse response
    ) {
        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());

        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            Map<String, Object> responseBody = new HashMap<>();
            User u = user.get();
            u.setLastSeen(LocalDateTime.now());

            // Добавляем user-данные
            responseBody.put("username", u.getUsername());
            responseBody.put("firstName", u.getFirstName());
            responseBody.put("lastName", u.getLastName());
            responseBody.put("email", u.getEmail());
            responseBody.put("addressStreet", u.getAddressStreet());
            responseBody.put("addressZipCode", u.getAddressZipCode());
            responseBody.put("addressCity", u.getAddressCity());
            responseBody.put("addressCountry", u.getAddressCountry());
            responseBody.put("imageUrl", u.getImageUrl());
            responseBody.put("lastSeen", u.getLastSeen());
            responseBody.put("role", u.getRole());



            String sessionId = UUID.randomUUID().toString();
            Session session = new Session(sessionId, Math.toIntExact(u.getId()), LocalDateTime.now());
            sessionRepository.save(session);

        
            ResponseCookie cookie = ResponseCookie.from("session", sessionId)
                    .httpOnly(true)
                    .secure(true) // в проде нужно true
                    .path("/")
                    .maxAge(Duration.ofDays(7))
                    .sameSite("None")
                    .build();

            response.setHeader("Set-Cookie", cookie.toString());

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(responseBody);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid username or password"));
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
