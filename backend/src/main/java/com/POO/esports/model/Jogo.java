package com.POO.esports.model;

import jakarta.persistence.*;

@Entity
@Table(name = "jogo")
public class Jogo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_jogo")
    private Long idJogo;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Genero genero;

    @Column(length = 45)
    private String versao;

    public enum Genero {
        FPS,
        MOBA,
        BATTLE_ROYALE,
        SPORTS
    }

    public Jogo() {
    }

    public Jogo(String titulo, Genero genero, String versao) {
        this.titulo = titulo;
        this.genero = genero;
        this.versao = versao;
    }

    public Long getIdJogo() {
        return idJogo;
    }

    public String getTitulo() {
        return titulo;
    }

    public Genero getGenero() {
        return genero;
    }

    public String getVersao() {
        return versao;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public void setVersao(String versao) {
        this.versao = versao;
    }
}