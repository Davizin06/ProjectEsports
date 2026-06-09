import { request } from './api'
import type {
    Campeonato,
    NovoCampeonato,
    AtualizarPremiacaoCampeonato,
} from './types'

export function cadastrarCampeonato(dados: NovoCampeonato): Promise<Campeonato> {
    return request<Campeonato>('/campeonatos', {
        method: 'POST',
        body: JSON.stringify(dados),
    })
}

export function listarCampeonatos(): Promise<Campeonato[]> {
    return request<Campeonato[]>('/campeonatos')
}

export function buscarCampeonatoPorId(id: number): Promise<Campeonato> {
    return request<Campeonato>(`/campeonatos/${id}`)
}

export function atualizarPremiacaoCampeonato(
    id: number,
    dados: AtualizarPremiacaoCampeonato
): Promise<Campeonato> {
    return request<Campeonato>(`/campeonatos/${id}/premiacao`, {
        method: 'PATCH',
        body: JSON.stringify(dados),
    })
}
