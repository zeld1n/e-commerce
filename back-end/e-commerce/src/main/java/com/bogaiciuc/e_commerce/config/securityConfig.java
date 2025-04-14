package com.bogaiciuc.e_commerce.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class securityConfig {

        @Bean
        public PasswordEncoder encoder() {
            return new BCryptPasswordEncoder();
        }
    }


