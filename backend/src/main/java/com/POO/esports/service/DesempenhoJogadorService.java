package com.POO.esports.service;

import com.POO.esports.model.DesempenhoJogador;
import com.POO.esports.model.DesempenhoJogadorId;
import com.POO.esports.repository.DesempenhoJogadorRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class DesempenhoJogadorService {

    @Autowired
    private DesempenhoJogadorRepository desempenhoRepository;

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public DesempenhoJogador registrarDesempenho(DesempenhoJogador desempenho) {
        if (desempenho.getIdJogador() == null || desempenho.getIdPartida() == null) {
            throw new IllegalArgumentException("Erro: O desempenho deve estar vinculado a um jogador e a uma partida");
        }

        validarKDA(desempenho.getKills(), desempenho.getDeaths(), desempenho.getAssists());

        desempenhoRepository.save(desempenho);

        entityManager.flush();
        entityManager.clear();

        return buscarPorId(desempenho.getIdJogador(), desempenho.getIdPartida());
    }

    public DesempenhoJogador atualizarKDA(Long idJogador, Long idPartida, Integer kills, Integer deaths, Integer assists) {
        DesempenhoJogadorId id = new DesempenhoJogadorId(idJogador, idPartida);
        Optional<DesempenhoJogador> desempenhoEncontrado = desempenhoRepository.findById(id);

        if (desempenhoEncontrado.isEmpty()) {
            throw new RuntimeException("Desempenho não encontrado para este jogador nesta partida");
        }

        validarKDA(kills, deaths, assists);

        DesempenhoJogador desempenho = desempenhoEncontrado.get();
        desempenho.setKills(kills);
        desempenho.setDeaths(deaths);
        desempenho.setAssists(assists);

        return desempenhoRepository.save(desempenho);
    }

    public DesempenhoJogador buscarPorId(Long idJogador, Long idPartida) {
        DesempenhoJogadorId id = new DesempenhoJogadorId(idJogador, idPartida);
        return desempenhoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Desempenho não encontrado"));
    }

    public BigDecimal calcularKda(Integer kills, Integer deaths, Integer assists) {
        validarKDA(kills, deaths, assists);
        return desempenhoRepository.calcularKda(kills, deaths, assists);
    }

    private void validarKDA(Integer kills, Integer deaths, Integer assists) {
        if (kills == null || deaths == null || assists == null) {
            throw new IllegalArgumentException("Erro: kills, deaths e assists são obrigatórios");
        }

        if (kills < 0 || deaths < 0 || assists < 0) {
            throw new IllegalArgumentException("Erro: As estatísticas de KDA não podem ser negativas");
        }
    }
}
