package com.bogaiciuc.e_commerce.api.service;

import com.bogaiciuc.e_commerce.persistence.entity.User;
import com.bogaiciuc.e_commerce.persistence.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.apache.commons.validator.routines.EmailValidator;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean isValid(User user) {
        return isEmailValid(user.getEmail()) && isPasswordValid(user.getPassword()) && areFieldsFilled(user);
    }

    private boolean isEmailValid(String email) {
        return EmailValidator.getInstance().isValid(email);
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

    private boolean areFieldsFilled(User user) {
        return !user.getFirstName().isEmpty() &&
                !user.getLastName().isEmpty() &&
                !user.getAddressStreet().isEmpty() &&
                !user.getAddressZipCode().isEmpty() &&
                !user.getAddressCity().isEmpty() &&
                !user.getAddressCountry().isEmpty() &&
                !user.getEmail().isEmpty() &&
                !user.getUsername().isEmpty() &&
                !user.getPassword().isEmpty();
    }
    public User createUser(User user) {
        user.setLastSeen(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(User existingUser, User newUser) {
        existingUser.setAddressStreet(newUser.getAddressStreet());
        existingUser.setAddressZipCode(newUser.getAddressZipCode());
        existingUser.setAddressCity(newUser.getAddressCity());
        existingUser.setAddressCountry(newUser.getAddressCountry());
        existingUser.setImageUrl(newUser.getImageUrl());
        existingUser.setLastSeen(LocalDateTime.now());
        return userRepository.save(existingUser);
    }

    public User updateLastSeen(User user) {
        user.setLastSeen(LocalDateTime.now());
        return userRepository.save(user);
    }

    public boolean isValidSession(String session) {
        Optional<User> user = userRepository.findByUsername(session);
        return user.isPresent();
    }
}
