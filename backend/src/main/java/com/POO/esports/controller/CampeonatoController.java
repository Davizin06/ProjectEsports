package com.POO.esports.controller;

import com.POO.esports.dto.CampeonatoRequest;
import com.POO.esports.dto.JogadorRequest;
import com.POO.esports.model.Campeonato;
import com.POO.esports.model.Jogador;
import com.POO.esports.service.CampeonatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/campeonatos")
public class CampeonatoController {

    @Autowired
    private CampeonatoService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Campeonato> cadastrarCampeonato(@RequestBody CampeonatoRequest request) {
        Campeonato novoCamp = new Campeonato();
        novoCamp.setNome(request.getNome());
        novoCamp.setPremiacao(request.getPremiacao());

        Campeonato campeonato = service.cadastrarCampeonato(novoCamp, request.getJogoId());
        return ResponseEntity.status(201).body(campeonato);
    }

    @PatchMapping(value = "/{id}/premiacao", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Campeonato> atualizarPremiacao(@PathVariable("id") Long idCamp, @RequestBody BigDecimal novaPremiacao) {
        Campeonato campeonato = service.atualizarPremiacao(idCamp, novaPremiacao);
        return ResponseEntity.ok(campeonato);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Campeonato> buscarPorId(@PathVariable("id") Long idCamp) {
        Campeonato campeonato = service.buscarPorId(idCamp);
        return ResponseEntity.ok(campeonato);
    }
}