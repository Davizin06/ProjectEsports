package com.POO.esports.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.POO.esports.model.Campeonato;

@Repository
public interface CampeonatoRepository extends JpaRepository<Campeonato, Long> {

}