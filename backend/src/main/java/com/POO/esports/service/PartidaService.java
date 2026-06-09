package com.POO.esports.service;

import com.POO.esports.model.Partida;
import com.POO.esports.model.Time;
import com.POO.esports.repository.PartidaRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalTime;
import java.util.List;

@Service
public class PartidaService {

    @Autowired
    private PartidaRepository partidaRepository;

    public Partida agendarPartida(Partida novaPartida) {
        if (novaPartida.getDataHora() == null) {
            throw new IllegalArgumentException("Erro: A partida precisa ter uma data e hora definidas");
        }

        if (novaPartida.getCampeonato() == null) {
            throw new IllegalArgumentException("Erro: A partida deve obrigatoriamente estar vinculada a um campeonato");
        }

        if (novaPartida.getTimeA() == null) {
            throw new IllegalArgumentException("Erro: A partida precisa ter o Time A");
        }

        if (novaPartida.getTimeB() == null) {
            throw new IllegalArgumentException("Erro: A partida precisa ter o Time B");
        }

        if (novaPartida.getTimeA().getIdTime().equals(novaPartida.getTimeB().getIdTime())) {
            throw new IllegalArgumentException("Erro: O Time A e o Time B não podem ser o mesmo time");
        }

        novaPartida.setDuracao(null);
        novaPartida.setVencedor(null);

        return partidaRepository.save(novaPartida);
    }

    public Partida finalizarPartida(Long idPartida, LocalTime duracaoDaPartida, Time vencedor) {
        Partida partida = buscarPorId(idPartida);

        if (partida.getDuracao() != null) {
            throw new IllegalStateException("Erro: Esta partida já foi finalizada anteriormente");
        }

        if (duracaoDaPartida == null) {
            throw new IllegalArgumentException("Erro: A duração da partida é obrigatória");
        }

        if (vencedor == null) {
            throw new IllegalArgumentException("Erro: O vencedor da partida é obrigatório");
        }

        boolean vencedorEhTimeA = partida.getTimeA().getIdTime().equals(vencedor.getIdTime());
        boolean vencedorEhTimeB = partida.getTimeB().getIdTime().equals(vencedor.getIdTime());

        if (!vencedorEhTimeA && !vencedorEhTimeB) {
            throw new IllegalArgumentException("Erro: O vencedor precisa ser um dos times da partida");
        }

        partida.setDuracao(duracaoDaPartida);
        partida.setVencedor(vencedor);

        vencedor.setVitoriasTotais(vencedor.getVitoriasTotais() + 1);

        return partidaRepository.save(partida);
    }

    public List<Partida> listarPartidas() {
        return partidaRepository.findAll();
    }

    public Partida buscarPorId(Long idPartida) {
        return partidaRepository.findById(idPartida)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));
    }
}
