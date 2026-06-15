package com.POO.esports.dto;

public class JogadorDesempenhoResponse {

    private Long idJogador;
    private String nickname;
    private Integer kills;
    private Integer deaths;
    private Integer assists;

    public JogadorDesempenhoResponse() {
    }

    public JogadorDesempenhoResponse(Long idJogador, String nickname, Integer kills, Integer deaths, Integer assists) {
        this.idJogador = idJogador;
        this.nickname = nickname;
        this.kills = kills;
        this.deaths = deaths;
        this.assists = assists;
    }

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
