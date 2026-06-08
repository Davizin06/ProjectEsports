package com.POO.esports.dto;

import java.time.LocalTime;

public class FinalizarPartidaRequest {
    private LocalTime duracao;

    public FinalizarPartidaRequest() {

    }

    public LocalTime getDuracao() { return duracao; }
    public void setDuracao(LocalTime duracao) { this.duracao = duracao; }
}
