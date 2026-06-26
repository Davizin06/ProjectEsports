package com.POO.esports.view;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.math.BigDecimal;

@Entity
@Table(name = "vw_ranking_jogadores")
public class RankingJogadorView {

    @Id
    @Column(name = "id_jogador")
    private Long idJogador;

    private String nickname;

    private String time;

    @Column(name = "total_kills")
    private Integer totalKills;

    @Column(name = "total_deaths")
    private Integer totalDeaths;

    @Column(name = "total_assists")
    private Integer totalAssists;

    private BigDecimal kda;

    public Long getIdJogador() {
        return idJogador;
    }

    public void setIdJogador(Long idJogador) {
        this.idJogador = idJogador;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Integer getTotalKills() {
        return totalKills;
    }

    public void setTotalKills(Integer totalKills) {
        this.totalKills = totalKills;
    }

    public Integer getTotalDeaths() {
        return totalDeaths;
    }

    public void setTotalDeaths(Integer totalDeaths) {
        this.totalDeaths = totalDeaths;
    }

    public Integer getTotalAssists() {
        return totalAssists;
    }

    public void setTotalAssists(Integer totalAssists) {
        this.totalAssists = totalAssists;
    }

    public BigDecimal getKda() {
        return kda;
    }

    public void setKda(BigDecimal kda) {
        this.kda = kda;
    }
}
