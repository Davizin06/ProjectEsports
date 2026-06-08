package com.POO.esports.controller;
import com.POO.esports.dto.FinalizarPartidaRequest;
import com.POO.esports.dto.PartidaRequest;
import com.POO.esports.model.Campeonato;
import com.POO.esports.model.Partida;
import com.POO.esports.model.Sumula;
import com.POO.esports.repository.CampeonatoRepository;
import com.POO.esports.service.PartidaService;
import com.POO.esports.service.SumulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/partidas")
public class PartidaController {

    @Autowired
    private PartidaService partidaService;

    @Autowired
    private SumulaService sumulaService;

    @Autowired
    private CampeonatoRepository campeonatoRepository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Partida> agendarPartida(@RequestBody PartidaRequest request) {
        Partida novaPartida = new Partida();
        novaPartida.setDataHora(request.getDataHora());

        if (request.getCampeonatoId() != null) {
            Campeonato campeonato = campeonatoRepository.findById(Long.valueOf(request.getCampeonatoId()))
                    .orElseThrow(() -> new IllegalArgumentException("Erro: Campeonato não encontrado"));
            novaPartida.setCampeonato(campeonato);
        }

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

    @PatchMapping(value = "/{id}/finalizar", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Partida> finalizarPartida(@PathVariable("id") Long idPartida, @RequestBody FinalizarPartidaRequest request) {
        Partida partida = partidaService.finalizarPartida(idPartida, request.getDuracao());
        return ResponseEntity.ok(partida);
    }
}