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

    public Partida() {
    }

    public Partida(LocalDateTime dataHora, LocalTime duracao, Campeonato campeonato) {
        this.dataHora = dataHora;
        this.duracao = duracao;
        this.campeonato = campeonato;
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

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public void setDuracao(LocalTime duracao) {
        this.duracao = duracao;
    }

    public void setCampeonato(Campeonato campeonato) {
        this.campeonato = campeonato;
    }
}