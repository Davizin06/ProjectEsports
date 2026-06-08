package com.POO.esports.repository;

import com.POO.esports.model.Partida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.POO.esports.model.Sumula;

import java.util.Optional;

@Repository
public interface SumulaRepository extends JpaRepository<Sumula, Long> {
    Optional<Sumula> findByPartida(Partida partida);
}