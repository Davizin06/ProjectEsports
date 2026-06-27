package com.POO.esports.service;

import com.POO.esports.dto.DesempenhoPartidaResponse;
import com.POO.esports.dto.JogadorDesempenhoResponse;
import com.POO.esports.dto.TimeDesempenhoResponse;
import com.POO.esports.model.DesempenhoJogador;
import com.POO.esports.model.Jogador;
import com.POO.esports.model.Partida;
import com.POO.esports.model.Time;
import com.POO.esports.repository.DesempenhoJogadorRepository;
import com.POO.esports.repository.JogadorRepository;
import com.POO.esports.repository.PartidaRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class PartidaService {

    @Autowired
    private PartidaRepository partidaRepository;

    @Autowired
    private JogadorRepository jogadorRepository;

    @Autowired
    private DesempenhoJogadorRepository desempenhoRepository;

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

        return partidaRepository.save(partida);
    }

    public Partida atualizarPlacar(Long idPartida, Integer placarTimeA, Integer placarTimeB) {
        Partida partida = buscarPorId(idPartida);

        if (placarTimeA == null || placarTimeB == null) {
            throw new IllegalArgumentException("Erro: O placar de ambos os times é obrigatório");
        }

        if (placarTimeA < 0 || placarTimeB < 0) {
            throw new IllegalArgumentException("Erro: O placar não pode ser negativo");
        }

        partida.setPlacarTimeA(placarTimeA);
        partida.setPlacarTimeB(placarTimeB);

        return partidaRepository.save(partida);
    }

    public List<Partida> listarPartidas() {
        return partidaRepository.findAll();
    }

    public Partida buscarPorId(Long idPartida) {
        return partidaRepository.findById(idPartida)
                .orElseThrow(() -> new RuntimeException("Partida não encontrada"));
    }

    public DesempenhoPartidaResponse listarDesempenhosDaPartida(Long idPartida) {
        Partida partida = buscarPorId(idPartida);

        Map<Long, DesempenhoJogador> porJogador =
                desempenhoRepository.buscarPorPartida(idPartida).stream()
                        .collect(Collectors.toMap(DesempenhoJogador::getIdJogador, Function.identity()));

        return new DesempenhoPartidaResponse(
                montarTime(partida.getTimeA(), porJogador),
                montarTime(partida.getTimeB(), porJogador)
        );
    }

    private TimeDesempenhoResponse montarTime(Time time, Map<Long, DesempenhoJogador> porJogador) {
        List<JogadorDesempenhoResponse> jogadores = new ArrayList<>();

        for (Jogador jogador : jogadorRepository.buscarPorTime(time.getIdTime())) {
            DesempenhoJogador desempenho = porJogador.get(jogador.getIdJogador());

            jogadores.add(new JogadorDesempenhoResponse(
                    jogador.getIdJogador(),
                    jogador.getNickname(),
                    desempenho != null ? desempenho.getKills() : 0,
                    desempenho != null ? desempenho.getDeaths() : 0,
                    desempenho != null ? desempenho.getAssists() : 0
            ));
        }

        return new TimeDesempenhoResponse(time.getIdTime(), time.getNome(), jogadores);
    }

    @Transactional
    public Partida finalizarPartidaPorProcedure(Long idPartida, LocalTime duracaoDaPartida, Long idVencedor) {
        if (idPartida == null) {
            throw new IllegalArgumentException("Erro: O ID da partida é obrigatório");
        }

        if (duracaoDaPartida == null) {
            throw new IllegalArgumentException("Erro: A duração da partida é obrigatória");
        }

        if (idVencedor == null) {
            throw new IllegalArgumentException("Erro: O vencedor da partida é obrigatório");
        }

        partidaRepository.finalizarPartidaPorProcedure(idPartida, duracaoDaPartida, idVencedor);

        return buscarPorId(idPartida);
    }
}
