package com.POO.esports.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.POO.esports.model.Jogador;

@Repository
public interface JogadorRepository extends JpaRepository<Jogador, Long> {

    @Query("SELECT j FROM Jogador j WHERE j.time.idTime = :idTime")
    List<Jogador> buscarPorTime(@Param("idTime") Long idTime);
}