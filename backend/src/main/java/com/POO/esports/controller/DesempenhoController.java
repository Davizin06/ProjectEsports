package com.POO.esports.controller;

import com.POO.esports.dto.DesempenhoRequest;
import com.POO.esports.dto.KDARequest;
import com.POO.esports.model.DesempenhoJogador;
import com.POO.esports.service.DesempenhoJogadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/desempenhos")
public class DesempenhoController {

    @Autowired
    private DesempenhoJogadorService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DesempenhoJogador> registrarDesempenho(@RequestBody DesempenhoRequest request) {
        DesempenhoJogador desempenho = new DesempenhoJogador();
        desempenho.setIdJogador(request.getIdJogador());
        desempenho.setIdPartida(request.getIdPartida());
        desempenho.setKills(request.getKills() != null ? request.getKills() : 0);
        desempenho.setDeaths(request.getDeaths() != null ? request.getDeaths() : 0);
        desempenho.setAssists(request.getAssists() != null ? request.getAssists() : 0);

        DesempenhoJogador salvo = service.registrarDesempenho(desempenho);
        return ResponseEntity.status(201).body(salvo);
    }

    @PutMapping(value = "/{idJogador}/{idPartida}/kda", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DesempenhoJogador> atualizarKDA(
            @PathVariable Long idJogador,
            @PathVariable Long idPartida,
            @RequestBody KDARequest request) {

        DesempenhoJogador atualizado = service.atualizarKDA(
                idJogador,
                idPartida,
                request.getKills(),
                request.getDeaths(),
                request.getAssists()
        );

        return ResponseEntity.ok(atualizado);
    }

    @GetMapping(value = "/{idJogador}/{idPartida}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<DesempenhoJogador> buscarPorId(
            @PathVariable Long idJogador,
            @PathVariable Long idPartida) {

        DesempenhoJogador desempenho = service.buscarPorId(idJogador, idPartida);
        return ResponseEntity.ok(desempenho);
    }

    @GetMapping(value = "/calcular-kda", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BigDecimal> calcularKda(
            @RequestParam Integer kills,
            @RequestParam Integer deaths,
            @RequestParam Integer assists
    ) {
        return ResponseEntity.ok(service.calcularKda(kills, deaths, assists));
    }
}
