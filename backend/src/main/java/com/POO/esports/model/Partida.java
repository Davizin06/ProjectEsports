package com.POO.esports.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "partida")
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_partida")
    private Long idPartida;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    private LocalTime duracao;

    @ManyToOne
    @JoinColumn(name = "id_camp")
    private Campeonato campeonato;

    @ManyToOne
    @JoinColumn(name = "id_time_a", nullable = false)
    private Time timeA;

    @ManyToOne
    @JoinColumn(name = "id_time_b", nullable = false)
    private Time timeB;

    @ManyToOne
    @JoinColumn(name = "id_time_vencedor")
    private Time vencedor;

    @Column(name = "placar_time_a")
    private Integer placarTimeA;

    @Column(name = "placar_time_b")
    private Integer placarTimeB;

    public Partida() {
    }

    public Partida(
            LocalDateTime dataHora,
            LocalTime duracao,
            Campeonato campeonato,
            Time timeA,
            Time timeB,
            Time vencedor
    ) {
        this.dataHora = dataHora;
        this.duracao = duracao;
        this.campeonato = campeonato;
        this.timeA = timeA;
        this.timeB = timeB;
        this.vencedor = vencedor;
    }

    public Long getIdPartida() {
        return idPartida;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public LocalTime getDuracao() {
        return duracao;
    }

    public Campeonato getCampeonato() {
        return campeonato;
    }

    public Time getTimeA() {
        return timeA;
    }

    public Time getTimeB() {
        return timeB;
    }

    public Time getVencedor() {
        return vencedor;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public void setDuracao(LocalTime duracao) {
        this.duracao = duracao;
    }

    public void setCampeonato(Campeonato campeonato) {
        this.campeonato = campeonato;
    }

    public void setTimeA(Time timeA) {
        this.timeA = timeA;
    }

    public void setTimeB(Time timeB) {
        this.timeB = timeB;
    }

    public void setVencedor(Time vencedor) {
        this.vencedor = vencedor;
    }

    public Integer getPlacarTimeA() {
        return placarTimeA;
    }

    public void setPlacarTimeA(Integer placarTimeA) {
        this.placarTimeA = placarTimeA;
    }

    public Integer getPlacarTimeB() {
        return placarTimeB;
    }

    public void setPlacarTimeB(Integer placarTimeB) {
        this.placarTimeB = placarTimeB;
    }
}
