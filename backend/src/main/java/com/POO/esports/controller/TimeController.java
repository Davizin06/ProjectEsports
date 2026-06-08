package com.POO.esports.controller;

import com.POO.esports.dto.JogoRequest;
import com.POO.esports.dto.TimeRequest;
import com.POO.esports.model.Jogo;
import com.POO.esports.model.Time;
import com.POO.esports.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/times")
public class TimeController {

    @Autowired
    private TimeService service;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Time> cadastrarTime(@RequestBody TimeRequest request){
        Time novoTime = new Time();
        novoTime.setNome(request.getNome());
        novoTime.setDataFundacao(request.getDataFundacao());

        Time time = service.cadastrarTime(novoTime);
        return ResponseEntity.status(201).body(time);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Time> listarTimes(){
        return service.listarTimes();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Time buscarPorId(@PathVariable("id") Long timeId){
        Time time = service.buscarPorId(timeId);
        return time;
    }

    @PutMapping(value = "/{id}/vitoria", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Time> registrarVitoria(@PathVariable("id") Long timeId) {
        Time vitoria = service.registrarVitoria(timeId);
        return ResponseEntity.ok(vitoria);
    }

}
