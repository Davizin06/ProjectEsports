package com.POO.esports.dto;

import java.time.LocalDateTime;

public class PartidaRequest {

    private LocalDateTime dataHora;
    private Long campeonatoId;
    private Long timeAId;
    private Long timeBId;

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public Long getCampeonatoId() {
        return campeonatoId;
    }

    public void setCampeonatoId(Long campeonatoId) {
        this.campeonatoId = campeonatoId;
    }

    public Long getTimeAId() {
        return timeAId;
    }

    public void setTimeAId(Long timeAId) {
        this.timeAId = timeAId;
    }

    public Long getTimeBId() {
        return timeBId;
    }

    public void setTimeBId(Long timeBId) {
        this.timeBId = timeBId;
    }
}
