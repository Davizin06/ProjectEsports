package com.POO.esports.model;

import java.io.Serializable;
import java.util.Objects;

public class DesempenhoJogadorId implements Serializable {

    private Long idJogador;
    private Long idPartida;

    public DesempenhoJogadorId() {
    }

    public DesempenhoJogadorId(Long idJogador, Long idPartida) {
        this.idJogador = idJogador;
        this.idPartida = idPartida;
    }

    public Long getIdJogador() {
        return idJogador;
    }

    public void setIdJogador(Long idJogador) {
        this.idJogador = idJogador;
    }

    public Long getIdPartida() {
        return idPartida;
    }

    public void setIdPartida(Long idPartida) {
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
