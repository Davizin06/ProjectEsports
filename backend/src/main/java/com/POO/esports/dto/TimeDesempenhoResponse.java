package com.POO.esports.dto;

import java.util.List;

public class TimeDesempenhoResponse {

    private Long idTime;
    private String nome;
    private List<JogadorDesempenhoResponse> jogadores;

    public TimeDesempenhoResponse() {
    }

    public TimeDesempenhoResponse(Long idTime, String nome, List<JogadorDesempenhoResponse> jogadores) {
        this.idTime = idTime;
        this.nome = nome;
        this.jogadores = jogadores;
    }

    public Long getIdTime() {
        return idTime;
    }

    public void setIdTime(Long idTime) {
        this.idTime = idTime;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<JogadorDesempenhoResponse> getJogadores() {
        return jogadores;
    }

    public void setJogadores(List<JogadorDesempenhoResponse> jogadores) {
        this.jogadores = jogadores;
    }
}
