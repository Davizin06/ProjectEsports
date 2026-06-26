package com.POO.esports.repository;

import com.POO.esports.view.RankingJogadorView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RankingJogadorRepository extends JpaRepository<RankingJogadorView, Long> {
}
