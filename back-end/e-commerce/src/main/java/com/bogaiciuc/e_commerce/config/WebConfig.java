package com.bogaiciuc.e_commerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Разрешаем CORS для всех эндпоинтов
        registry.addMapping("/**")  // Все эндпоинты приложения
                .allowedOrigins("http://localhost:3000")  // Разрешаем запросы с фронтенда
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Разрешаем методы GET, POST, PUT, DELETE
                .allowedHeaders("*")  // Разрешаем все заголовки
                .allowCredentials(true);  // Включаем поддержку cookies/учетных данных
    }
}
