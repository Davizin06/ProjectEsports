package com.POO.esports.controller;

import com.POO.esports.repository.RankingJogadorRepository;
import com.POO.esports.view.RankingJogadorView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RankingJogadorController {

    private final RankingJogadorRepository rankingJogadorRepository;

    public RankingJogadorController(RankingJogadorRepository rankingJogadorRepository) {
        this.rankingJogadorRepository = rankingJogadorRepository;
    }

    @GetMapping("/ranking/jogadores")
    public List<RankingJogadorView> listarRanking() {
        return rankingJogadorRepository.findAll();
    }
}
