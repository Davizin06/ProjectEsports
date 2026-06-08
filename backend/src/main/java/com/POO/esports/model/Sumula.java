package com.POO.esports.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sumula_oficial")
public class Sumula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sumula")
    private Long idSumula;

    @Column(name = "aprovado_juiz", nullable = false)
    private boolean aprovadoJuiz = false;

    @OneToOne
    @JoinColumn(name = "id_partida")
    private Partida partida;

    public Sumula() {
    }

    public Sumula(boolean aprovadoJuiz, Partida partida) {
        this.aprovadoJuiz = aprovadoJuiz;
        this.partida = partida;
    }

    public Long getIdSumula() {
        return idSumula;
    }

    public boolean isAprovadoJuiz() {
        return aprovadoJuiz;
    }

    public Partida getPartida() {
        return partida;
    }

    public void setAprovadoJuiz(boolean aprovadoJuiz) {
        this.aprovadoJuiz = aprovadoJuiz;
    }

    public void setPartida(Partida partida) {
        this.partida = partida;
    }
}