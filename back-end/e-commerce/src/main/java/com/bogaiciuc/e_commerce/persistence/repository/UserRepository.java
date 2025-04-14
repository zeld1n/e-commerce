package com.bogaiciuc.e_commerce.persistence.repository;

<<<<<<< Updated upstream
import com.bogaiciuc.e_commerce.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

=======
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.bogaiciuc.e_commerce.persistence.entity.User;
>>>>>>> Stashed changes


public interface UserRepository extends JpaRepository<User, Integer> {

}