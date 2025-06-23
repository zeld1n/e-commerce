package com.bogaiciuc.e_commerce.api.dto;

import com.bogaiciuc.e_commerce.persistence.entity.Order;

import java.util.List;

public class UserProfileDTO {
  private String nome;
  private String cognome;
  private String email;
   private String via;
   private String citta;
   private String provincia;
    private String cap;
    private String paese;

    private List<Order> orders;


    public UserProfileDTO(String nome, String cognome, String email, String via, String citta, String provincia, String cap, String paese, List<Order> orders) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.via = via;
        this.citta = citta;
        this.provincia = provincia;
        this.cap = cap;
        this.paese = paese;
        this.orders = orders;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getVia() {
        return via;
    }

    public void setVia(String via) {
        this.via = via;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
    }

    public String getPaese() {
        return paese;
    }

    public void setPaese(String paese) {
        this.paese = paese;
    }
}

