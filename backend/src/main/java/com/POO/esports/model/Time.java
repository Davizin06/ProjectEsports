package com.POO.esports.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "time_esports")
public class Time {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_time")
    private Long idTime;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "data_fundacao")
    private LocalDate dataFundacao;

    @Column(name = "vitorias_totais", nullable = false)
    private int vitoriasTotais = 0;

    public Time() {
    }

    public Time(String nome, LocalDate dataFundacao, int vitoriasTotais) {
        this.nome = nome;
        this.dataFundacao = dataFundacao;
        this.vitoriasTotais = vitoriasTotais;
    }

    public Long getIdTime() {
        return idTime;
    }

    public String getNome() {
        return nome;
    }

    public LocalDate getDataFundacao() {
        return dataFundacao;
    }

    public int getVitoriasTotais() {
        return vitoriasTotais;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setDataFundacao(LocalDate dataFundacao) {
        this.dataFundacao = dataFundacao;
    }

    public void setVitoriasTotais(int vitoriasTotais) {
        this.vitoriasTotais = vitoriasTotais;
    }
}