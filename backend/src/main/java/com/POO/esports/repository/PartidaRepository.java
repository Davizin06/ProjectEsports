package com.POO.esports.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.POO.esports.model.Partida;

@Repository
public interface PartidaRepository extends JpaRepository<Partida, Long> {

}