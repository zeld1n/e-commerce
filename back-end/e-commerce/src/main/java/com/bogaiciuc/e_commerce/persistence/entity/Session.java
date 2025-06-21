package com.bogaiciuc.e_commerce.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class Session {
    @Id
    private String sessionId;

    private int userId;

    private LocalDateTime createdAt;

    public Session(String sessionId, int userId, LocalDateTime createdAt) {
        this.sessionId = sessionId;
        this.userId = userId;
        this.createdAt = createdAt;
    }
    public Session(){

    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public int getUserId() {
        return userId;
    }



    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
