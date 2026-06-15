package com.POO.esports.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.POO.esports.model.DesempenhoJogador;
import com.POO.esports.model.DesempenhoJogadorId;

@Repository
public interface DesempenhoJogadorRepository extends JpaRepository<DesempenhoJogador, DesempenhoJogadorId> {

    @Query("SELECT d FROM DesempenhoJogador d WHERE d.idPartida = :idPartida")
    List<DesempenhoJogador> buscarPorPartida(@Param("idPartida") Integer idPartida);
}