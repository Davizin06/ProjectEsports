package com.POO.esports.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "desempenho_jogador")
@IdClass(DesempenhoJogadorId.class)
public class DesempenhoJogador {

    @Id
    @Column(name = "id_jogador")
    private Integer idJogador;

    @Id
    @Column(name = "id_partida")
    private Integer idPartida;

    @ManyToOne
    @JoinColumn(name = "id_jogador", insertable = false, updatable = false)
    private Jogador jogador;

    @ManyToOne
    @JoinColumn(name = "id_partida", insertable = false, updatable = false)
    private Partida partida;

    @Column(nullable = false)
    private Integer kills = 0;

    @Column(nullable = false)
    private Integer deaths = 0;

    @Column(nullable = false)
    private Integer assists = 0;

    public DesempenhoJogador() {
    }

    public DesempenhoJogador(Integer idJogador, Integer idPartida, Integer kills, Integer deaths, Integer assists) {
        this.idJogador = idJogador;
        this.idPartida = idPartida;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
    }

    public Integer getIdJogador() {
        return idJogador;
    }

    public void setIdJogador(Integer idJogador) {
        this.idJogador = idJogador;
    }

    public Integer getIdPartida() {
        return idPartida;
    }

    public void setIdPartida(Integer idPartida) {
        this.idPartida = idPartida;
    }

    public Jogador getJogador() {
        return jogador;
    }

    public Partida getPartida() {
        return partida;
    }

    public Integer getKills() {
        return kills;
    }

    public void setKills(Integer kills) {
        this.kills = kills;
    }

    public Integer getDeaths() {
        return deaths;
    }

    public void setDeaths(Integer deaths) {
        this.deaths = deaths;
    }

    public Integer getAssists() {
        return assists;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }
}