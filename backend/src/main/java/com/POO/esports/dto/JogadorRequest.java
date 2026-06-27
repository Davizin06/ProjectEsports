package com.POO.esports.dto;

import com.POO.esports.model.Time;

import java.math.BigDecimal;

public class JogadorRequest {
    private String nickname;
    private Integer idadeJogador;
    private BigDecimal salario;
    private Long timeId;

    public JogadorRequest(){

    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Integer getIdadeJogador() {
        return idadeJogador;
    }

    public void setIdadeJogador(Integer idadeJogador) {
        this.idadeJogador = idadeJogador;
    }

    public BigDecimal getSalario() {
        return salario;
    }

    public void setSalario(BigDecimal salario) {
        this.salario = salario;
    }

    public Long getTimeId() {
        return timeId;
    }

    public void setTimeId(Long timeId) {
        this.timeId = timeId;
    }
}
