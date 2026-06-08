package com.POO.esports.model;

import java.io.Serializable;
import java.util.Objects;

public class DesempenhoJogadorId implements Serializable {

    private Integer idJogador;
    private Integer idPartida;

    public DesempenhoJogadorId() {
    }

    public DesempenhoJogadorId(Integer idJogador, Integer idPartida) {
        this.idJogador = idJogador;
        this.idPartida = idPartida;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DesempenhoJogadorId)) return false;
        DesempenhoJogadorId that = (DesempenhoJogadorId) o;
        return Objects.equals(idJogador, that.idJogador)
                && Objects.equals(idPartida, that.idPartida);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idJogador, idPartida);
    }
}