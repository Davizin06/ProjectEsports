package com.POO.esports.service;

import com.POO.esports.model.Jogo;
import com.POO.esports.repository.JogoRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

@Service
public class JogoService {

    @Autowired
    private JogoRepository jogoRepository;

    public Jogo cadastrarJogo(Jogo novoJogo) {
        if (novoJogo.getTitulo() == null || novoJogo.getTitulo().trim().isEmpty()) {
            throw new IllegalArgumentException("Erro: O jogo precisa ter um título válido");
        }
        if (novoJogo.getGenero() == null) {
            throw new IllegalArgumentException("Erro: O jogo precisa ter um gênero definido");
        }

        return jogoRepository.save(novoJogo);
    }

    public Jogo atualizarVersao(Long idJogo, String novaVersao) {
        Optional<Jogo> jogoEncontrado = jogoRepository.findById(idJogo);

        if (jogoEncontrado.isPresent()) {
            Jogo jogo = jogoEncontrado.get();
            jogo.setVersao(novaVersao);
            return jogoRepository.save(jogo);
        } else {
            throw new RuntimeException("Jogo não encontrado no sistema");
        }
    }

    public Jogo buscarPorId(Long idJogo) {
        return jogoRepository.findById(idJogo)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado"));
    }
}