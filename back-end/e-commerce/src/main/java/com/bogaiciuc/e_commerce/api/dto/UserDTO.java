package com.bogaiciuc.e_commerce.api.dto;

import com.bogaiciuc.e_commerce.persistence.entity.User;

public class UserDTO {
    private Long id;
    private String name;
    private String surname;
    private String email;

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getFirstName();
        this.surname=user.getLastName();
        this.email = user.getEmail();
    }

    public Long getId() {
        return id;
    }

    public String getSurname() {
        return surname;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
