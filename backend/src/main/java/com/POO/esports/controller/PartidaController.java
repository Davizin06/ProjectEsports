package com.POO.esports.controller;

import com.POO.esports.dto.DesempenhoPartidaResponse;
import com.POO.esports.dto.FinalizarPartidaRequest;
import com.POO.esports.dto.PartidaRequest;
import com.POO.esports.dto.PlacarRequest;
import com.POO.esports.model.Campeonato;
import com.POO.esports.model.Partida;
import com.POO.esports.model.Sumula;
import com.POO.esports.model.Time;
import com.POO.esports.repository.CampeonatoRepository;
import com.POO.esports.repository.TimeRepository;
import com.POO.esports.service.PartidaService;
import com.POO.esports.service.SumulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/partidas")
public class PartidaController {

    @Autowired
    private PartidaService partidaService;

    @Autowired
    private SumulaService sumulaService;

    @Autowired
    private CampeonatoRepository campeonatoRepository;

    @Autowired
    private TimeRepository timeRepository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Partida> agendarPartida(@RequestBody PartidaRequest request) {
        Partida novaPartida = new Partida();
        novaPartida.setDataHora(request.getDataHora());

        Campeonato campeonato = campeonatoRepository.findById(request.getCampeonatoId())
                .orElseThrow(() -> new IllegalArgumentException("Erro: Campeonato não encontrado"));

        Time timeA = timeRepository.findById(request.getTimeAId())
                .orElseThrow(() -> new IllegalArgumentException("Erro: Time A não encontrado"));

        Time timeB = timeRepository.findById(request.getTimeBId())
                .orElseThrow(() -> new IllegalArgumentException("Erro: Time B não encontrado"));

        novaPartida.setCampeonato(campeonato);
        novaPartida.setTimeA(timeA);
        novaPartida.setTimeB(timeB);

        Partida partida = partidaService.agendarPartida(novaPartida);
        return ResponseEntity.status(201).body(partida);
    }

    @PostMapping(value = "/{id}/sumula", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Sumula> gerarSumula(@PathVariable("id") Long idPartida) {
        Partida partida = partidaService.buscarPorId(idPartida);

        Sumula novaSumula = new Sumula();
        novaSumula.setPartida(partida);

        Sumula sumula = sumulaService.gerarSumula(novaSumula);
        return ResponseEntity.status(201).body(sumula);
    }

    @PatchMapping(value = "/{id}/sumula/aprovar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Sumula> aprovarSumula(@PathVariable("id") Long idPartida) {
        Partida partida = partidaService.buscarPorId(idPartida);
        Sumula sumula = sumulaService.buscarPorPartida(partida);

        Sumula aprovada = sumulaService.aprovarSumula(sumula.getIdSumula());
        return ResponseEntity.ok(aprovada);
    }

    @GetMapping(value = "/{id}/sumula", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Sumula> buscarSumula(@PathVariable("id") Long idPartida) {
        Partida partida = partidaService.buscarPorId(idPartida);
        Sumula sumula = sumulaService.buscarPorPartida(partida);
        return ResponseEntity.ok(sumula);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Partida> listarPartidas() {
        return partidaService.listarPartidas();
    }

    @GetMapping(value = "/{id}/desempenhos", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DesempenhoPartidaResponse> listarDesempenhos(@PathVariable("id") Long idPartida) {
        return ResponseEntity.ok(partidaService.listarDesempenhosDaPartida(idPartida));
    }

    @PatchMapping(value = "/{id}/placar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Partida> atualizarPlacar(
            @PathVariable("id") Long idPartida,
            @RequestBody PlacarRequest request
    ) {
        Partida partida = partidaService.atualizarPlacar(
                idPartida,
                request.getPlacarTimeA(),
                request.getPlacarTimeB()
        );

        return ResponseEntity.ok(partida);
    }

    @PatchMapping(value = "/{id}/finalizar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Partida> finalizarPartida(
            @PathVariable("id") Long idPartida,
            @RequestBody FinalizarPartidaRequest request
    ) {
        Time vencedor = timeRepository.findById(request.getVencedorId())
                .orElseThrow(() -> new IllegalArgumentException("Erro: Time vencedor não encontrado"));

        Partida partida = partidaService.finalizarPartida(
                idPartida,
                request.getDuracao(),
                vencedor
        );

        return ResponseEntity.ok(partida);
    }

    @PatchMapping(value = "/{id}/finalizar-procedure", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Partida> finalizarPartidaPorProcedure(
        @PathVariable("id") Long idPartida,
        @RequestBody FinalizarPartidaRequest request
    ) {

        Partida partida = partidaService.finalizarPartidaPorProcedure(
            idPartida,
            request.getDuracao(),
            request.getVencedorId()
        );

        return ResponseEntity.ok(partida);
    }
}
