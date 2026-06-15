import { request } from './api'
import type {
    Partida,
    NovaPartida,
    FinalizarPartida,
    AtualizarPlacar,
    Sumula,
    NovaSumula,
} from './types'

export function cadastrarPartida(dados: NovaPartida): Promise<Partida> {
    return request<Partida>('/partidas', {
        method: 'POST',
        body: JSON.stringify(dados),
    })
}

export function listarPartidas(): Promise<Partida[]> {
    return request<Partida[]>('/partidas')
}

export function buscarPartidaPorId(id: number): Promise<Partida> {
    return request<Partida>(`/partidas/${id}`)
}

export function finalizarPartida(
    id: number,
    dados: FinalizarPartida,
): Promise<Partida> {
    return request<Partida>(`/partidas/${id}/finalizar`, {
        method: 'PATCH',
        body: JSON.stringify(dados),
    })
}

export function atualizarPlacar(
    id: number,
    dados: AtualizarPlacar,
): Promise<Partida> {
    return request<Partida>(`/partidas/${id}/placar`, {
        method: 'PATCH',
        body: JSON.stringify(dados),
    })
}

export function criarSumulaPartida(
    id: number,
    dados: NovaSumula = {},
): Promise<Sumula> {
    return request<Sumula>(`/partidas/${id}/sumula`, {
        method: 'POST',
        body: JSON.stringify(dados),
    })
}

export function buscarSumulaPartida(id: number): Promise<Sumula> {
    return request<Sumula>(`/partidas/${id}/sumula`)
}

export function aprovarSumulaPartida(id: number): Promise<Sumula> {
    return request<Sumula>(`/partidas/${id}/sumula/aprovar`, {
        method: 'PATCH',
    })
}
