package com.POO.esports.dto;

import java.time.LocalDateTime;

public class PartidaRequest {
    private LocalDateTime dataHora;
    private Integer campeonatoId;

    public PartidaRequest() {

    }

    public LocalDateTime getDataHora() { return dataHora; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

    public Integer getCampeonatoId() { return campeonatoId; }
    public void setCampeonatoId(Integer campeonatoId) { this.campeonatoId = campeonatoId; }
}
