package com.POO.esports.repository;

import com.POO.esports.model.Partida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;

@Repository
public interface PartidaRepository extends JpaRepository<Partida, Long> {

    @Modifying
    @Query(value = "CALL finalizar_partida(:idPartida, :duracao, :idVencedor)", nativeQuery = true)
    void finalizarPartidaPorProcedure(
            @Param("idPartida") Long idPartida,
            @Param("duracao") LocalTime duracao,
            @Param("idVencedor") Long idVencedor
    );
}
