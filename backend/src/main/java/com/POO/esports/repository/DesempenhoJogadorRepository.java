package com.POO.esports.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.POO.esports.model.DesempenhoJogador;
import com.POO.esports.model.DesempenhoJogadorId;
import org.springframework.stereotype.Repository;

@Repository
public interface DesempenhoJogadorRepository extends JpaRepository<DesempenhoJogador, DesempenhoJogadorId> {

    @Query("SELECT d FROM DesempenhoJogador d WHERE d.idPartida = :idPartida")
    List<DesempenhoJogador> buscarPorPartida(@Param("idPartida") Long idPartida);

    @Query(value = "SELECT calcular_kda(:kills, :deaths, :assists)", nativeQuery = true)
    BigDecimal calcularKda(
            @Param("kills") Integer kills,
            @Param("deaths") Integer deaths,
            @Param("assists") Integer assists
    );
}
