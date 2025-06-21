package com.bogaiciuc.e_commerce.persistence.repository;

import com.bogaiciuc.e_commerce.persistence.entity.OrderItem;
import com.bogaiciuc.e_commerce.persistence.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session,Long> {
    Optional<Session> findBySessionId(String sessionId);


}
