package com.POO.esports.dto;

import java.math.BigDecimal;

public class CampeonatoRequest {
    private String nome;
    private BigDecimal premiacao;
    private Integer jogoId;

    public CampeonatoRequest(){

    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPremiacao() {
        return premiacao;
    }

    public void setPremiacao(BigDecimal premiacao) {
        this.premiacao = premiacao;
    }

    public Integer getJogoId() {
        return jogoId;
    }

    public void setJogoId(Integer jogoId) {
        this.jogoId = jogoId;
    }
}
