package com.POO.esports.controller;

import com.POO.esports.dto.JogoRequest;
import com.POO.esports.model.Jogo;
import com.POO.esports.service.JogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/jogos")
public class JogoController {

    @Autowired
    private JogoService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Jogo> cadastrarJogo(@RequestBody JogoRequest request){
        Jogo novoJogo = new Jogo();
        novoJogo.setTitulo(request.getTitulo());
        novoJogo.setGenero(request.getGenero());
        novoJogo.setVersao(request.getVersao());

        Jogo jogo = service.cadastrarJogo(novoJogo);
        return ResponseEntity.status(201).body(jogo);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Jogo buscarPorId(@PathVariable("id") Long jogoId){
        Jogo jogo = service.buscarPorId(jogoId);
        return jogo;
    }

    @PutMapping(value = "/{id}/versao", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Jogo> atualizarVersao(@PathVariable("id") Long jogoId, @RequestBody String novaVersao) {
        Jogo jogoAtualizado = service.atualizarVersao(jogoId, novaVersao);
        return ResponseEntity.ok(jogoAtualizado);
    }
}
