package com.POO.esports.service;

import com.POO.esports.model.Time;
import com.POO.esports.repository.TimeRepository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TimeService {

    @Autowired
    private TimeRepository timeRepository;

    public Time cadastrarTime(Time novoTime) {
        if (novoTime.getNome() == null || novoTime.getNome().trim().isEmpty()) {
            throw new IllegalArgumentException("Erro: O time precisa ter um nome válido");
        }

        if (novoTime.getDataFundacao() != null && novoTime.getDataFundacao().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Erro: A data de fundação não pode estar no futuro");
        }

        novoTime.setVitoriasTotais(0);

        return timeRepository.save(novoTime);
    }

    public List<Time> listarTimes() {
        return timeRepository.findAll();
    }

    public Time registrarVitoria(Long idTime) {
        Optional<Time> timeEncontrado = timeRepository.findById(idTime);

        if (timeEncontrado.isPresent()) {
            Time time = timeEncontrado.get();
            time.setVitoriasTotais(time.getVitoriasTotais() + 1);
            return timeRepository.save(time);
        } else {
            throw new RuntimeException("Time não encontrado no sistema");
        }
    }

    public Time buscarPorId(Long idTime) {
        return timeRepository.findById(idTime)
                .orElseThrow(() -> new RuntimeException("Time não encontrado"));
    }
}
