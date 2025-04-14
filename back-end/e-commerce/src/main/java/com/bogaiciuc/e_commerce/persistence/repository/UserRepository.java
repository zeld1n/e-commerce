package com.bogaiciuc.e_commerce.persistence.repository;
<<<<<<< Updated upstream
import com.bogaiciuc.e_commerce.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;



=======

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.bogaiciuc.e_commerce.persistence.entity.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

>>>>>>> Stashed changes
public interface UserRepository extends JpaRepository<User, Integer> {

}