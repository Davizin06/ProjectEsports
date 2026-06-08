package com.POO.esports.service;

import com.POO.esports.model.DesempenhoJogador;
import com.POO.esports.model.DesempenhoJogadorId;
import com.POO.esports.repository.DesempenhoJogadorRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
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
        if (desempenho.getKills() < 0 || desempenho.getDeaths() < 0 || desempenho.getAssists() < 0) {
            throw new IllegalArgumentException("Erro: As estatísticas de KDA não podem ser negativas");
        }

        desempenhoRepository.save(desempenho);

        // sem isso o hibernate devolve o objeto em cache e jogador/partida vem null
        entityManager.flush();
        entityManager.clear();

        return buscarPorId(desempenho.getIdJogador(), desempenho.getIdPartida());
    }

    public DesempenhoJogador atualizarKDA(Integer idJogador, Integer idPartida, Integer kills, Integer deaths, Integer assists) {
        DesempenhoJogadorId id = new DesempenhoJogadorId(idJogador, idPartida);
        Optional<DesempenhoJogador> desempenhoEncontrado = desempenhoRepository.findById(id);

        if (desempenhoEncontrado.isPresent()) {
            DesempenhoJogador desempenho = desempenhoEncontrado.get();
            if (kills < 0 || deaths < 0 || assists < 0) {
                throw new IllegalArgumentException("Erro: As estatísticas de KDA não podem ser negativas");
            }

            desempenho.setKills(kills);
            desempenho.setDeaths(deaths);
            desempenho.setAssists(assists);
            return desempenhoRepository.save(desempenho);
        } else {
            throw new RuntimeException("Desempenho não encontrado para este jogador nesta partida");
        }
    }

    public DesempenhoJogador buscarPorId(Integer idJogador, Integer idPartida) {
        DesempenhoJogadorId id = new DesempenhoJogadorId(idJogador, idPartida);
        return desempenhoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Desempenho não encontrado"));
    }
}