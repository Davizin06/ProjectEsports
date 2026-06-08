package com.POO.esports.service;

import com.POO.esports.model.Partida;
import com.POO.esports.model.Sumula;
import com.POO.esports.repository.SumulaRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

@Service
public class SumulaService {

    @Autowired
    private SumulaRepository sumulaRepository;

    public Sumula gerarSumula(Sumula novaSumula) {
        if (novaSumula.getPartida() == null) {
            throw new IllegalArgumentException("Erro: A súmula deve obrigatoriamente estar vinculada a uma partida");
        }

        novaSumula.setAprovadoJuiz(false);

        return sumulaRepository.save(novaSumula);
    }

    public Sumula aprovarSumula(Long idSumula) {
        Optional<Sumula> sumulaEncontrada = sumulaRepository.findById(idSumula);

        if (sumulaEncontrada.isPresent()) {
            Sumula sumula = sumulaEncontrada.get();
            if (sumula.isAprovadoJuiz()) {
                throw new IllegalStateException("Erro: Esta súmula já foi aprovada anteriormente");
            }

            sumula.setAprovadoJuiz(true);
            return sumulaRepository.save(sumula);
        } else {
            throw new RuntimeException("Súmula não encontrada no sistema");
        }
    }

    public Sumula buscarPorId(Long idSumula) {
        return sumulaRepository.findById(idSumula)
                .orElseThrow(() -> new RuntimeException("Súmula não encontrada"));
    }

    public Sumula buscarPorPartida(Partida partida) {
        return sumulaRepository.findByPartida(partida)
                .orElseThrow(() -> new RuntimeException("Súmula não encontrada para esta partida"));
    }
}
