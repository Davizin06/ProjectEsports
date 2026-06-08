package com.POO.esports.dto;

import com.POO.esports.model.Jogo;
import com.fasterxml.jackson.annotation.JsonInclude;

public class JogoRequest {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String titulo;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Jogo.Genero genero;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String versao;

    public enum Genero {
        FPS,
        MOBA,
        BATTLE_ROYALE,
        SPORTS
    }

    public JogoRequest(){
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Jogo.Genero getGenero() {
        return genero;
    }

    public void setGenero(Jogo.Genero genero) {
        this.genero = genero;
    }

    public String getVersao() {
        return versao;
    }

    public void setVersao(String versao) {
        this.versao = versao;
    }
}
