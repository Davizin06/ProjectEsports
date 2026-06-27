package com.POO.esports.service;

import com.POO.esports.model.Campeonato;
import com.POO.esports.model.Jogo;
import com.POO.esports.repository.CampeonatoRepository;
import com.POO.esports.repository.JogoRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.List;

@Service
public class CampeonatoService {

    @Autowired
    private CampeonatoRepository campeonatoRepository;
    @Autowired
    private JogoRepository jogoRepository;

    public Campeonato cadastrarCampeonato(Campeonato novoCampeonato, Long jogoId) {
        if (novoCampeonato.getNome() == null || novoCampeonato.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("Erro: O campeonato precisa ter um nome válido");
        }
        if (novoCampeonato.getPremiacao() != null && novoCampeonato.getPremiacao().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Erro: A premiação não pode ser negativa");
        }
        if (jogoId == null) {
            throw new IllegalArgumentException("Erro: O campeonato deve estar obrigatoriamente vinculado a um jogo");
        }

        Jogo jogo = jogoRepository.findById(jogoId)
                .orElseThrow(() -> new IllegalArgumentException("Erro: Jogo não encontrado"));
        novoCampeonato.setJogo(jogo);

        return campeonatoRepository.save(novoCampeonato);
    }

    public Campeonato atualizarPremiacao(Long idCamp, BigDecimal novaPremiacao) {
        Optional<Campeonato> campeonatoEncontrado = campeonatoRepository.findById(idCamp);

        if (campeonatoEncontrado.isPresent()) {
            Campeonato campeonato = campeonatoEncontrado.get();
            if (novaPremiacao.compareTo(BigDecimal.ZERO) < 0) {
                throw new IllegalArgumentException("Erro: A nova premiação não pode ser negativa");
            }
            campeonato.setPremiacao(novaPremiacao);
            return campeonatoRepository.save(campeonato);
        } else {
            throw new RuntimeException("Campeonato não encontrado no sistema");
        }
    }

    public Campeonato buscarPorId(Long idCamp) {
        return campeonatoRepository.findById(idCamp)
                .orElseThrow(() -> new RuntimeException("Campeonato não encontrado"));
    }

    public List<Campeonato> listarCampeonatos() {
        return campeonatoRepository.findAll();
    }

}
