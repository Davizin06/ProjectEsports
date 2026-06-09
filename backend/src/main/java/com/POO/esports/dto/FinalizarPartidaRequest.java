package com.POO.esports.dto;

import java.time.LocalTime;

public class FinalizarPartidaRequest {

    private LocalTime duracao;
    private Long vencedorId;

    public LocalTime getDuracao() {
        return duracao;
    }

    public void setDuracao(LocalTime duracao) {
        this.duracao = duracao;
    }

    public Long getVencedorId() {
        return vencedorId;
    }

    public void setVencedorId(Long vencedorId) {
        this.vencedorId = vencedorId;
    }
}
