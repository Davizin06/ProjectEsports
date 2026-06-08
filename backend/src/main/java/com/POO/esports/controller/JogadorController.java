package com.POO.esports.controller;

import com.POO.esports.dto.JogadorRequest;
import com.POO.esports.dto.TimeRequest;
import com.POO.esports.model.Jogador;
import com.POO.esports.model.Time;
import com.POO.esports.service.JogadorService;
import com.POO.esports.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jogadores")
public class JogadorController {

    @Autowired
    private JogadorService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Jogador> cadastrarJogador(@RequestBody JogadorRequest request){
        Jogador novoJogador = new Jogador();
        novoJogador.setNickname(request.getNickname());
        novoJogador.setIdadeJogador(request.getIdadeJogador());
        novoJogador.setSalario(request.getSalario());

        Jogador jogador = service.cadastrarJogador(novoJogador, request.getTimeId());
        return ResponseEntity.status(201).body(jogador);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Jogador buscarPorId(@PathVariable("id") Long jogadorId){
        Jogador jogador = service.buscarPorId(jogadorId);
        return jogador;
    }

    @PutMapping(value = "/{id}/transferencia", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Jogador> transferirJogador(@PathVariable("id") Long jogadorId, @RequestBody Time novoTime) {
        Jogador transferencia = service.transferirJogador(jogadorId, novoTime);
        return ResponseEntity.ok(transferencia);
    }
}
