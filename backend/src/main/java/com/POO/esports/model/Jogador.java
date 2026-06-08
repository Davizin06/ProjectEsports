package com.POO.esports.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "jogador")
public class Jogador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_jogador")
    private Long idJogador;

    @Column(nullable = false, length = 50)
    private String nickname;

    @Column(name = "idade_jogador")
    private Integer idadeJogador;

    @Column(precision = 10, scale = 2)
    private BigDecimal salario;

    @ManyToOne
    @JoinColumn(name = "id_time")
    private Time time;

    public Jogador() {
    }

    public Jogador(String nickname, Integer idadeJogador, BigDecimal salario, Time time) {
        this.nickname = nickname;
        this.idadeJogador = idadeJogador;
        this.salario = salario;
        this.time = time;
    }

    public Long getIdJogador() {
        return idJogador;
    }

    public String getNickname() {
        return nickname;
    }

    public Integer getIdadeJogador() {
        return idadeJogador;
    }

    public BigDecimal getSalario() {
        return salario;
    }

    public Time getTime() {
        return time;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setIdadeJogador(Integer idadeJogador) {
        this.idadeJogador = idadeJogador;
    }

    public void setSalario(BigDecimal salario) {
        this.salario = salario;
    }

    public void setTime(Time time) {
        this.time = time;
    }
}