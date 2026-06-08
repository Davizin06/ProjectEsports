package com.POO.esports.dto;

import java.time.LocalDate;

public class TimeRequest {
    private String nome;
    private LocalDate dataFundacao;

    public TimeRequest(){

    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getDataFundacao() {
        return dataFundacao;
    }

    public void setDataFundacao(LocalDate dataFundacao) {
        this.dataFundacao = dataFundacao;
    }
}
