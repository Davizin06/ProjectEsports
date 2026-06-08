import { request } from './api'
import type { Jogador, NovoJogador } from './types'

export function cadastrarJogador(dados: NovoJogador): Promise<Jogador> {
    return request<Jogador>('/jogadores', {
        method: 'POST',
        body: JSON.stringify(dados),
    })
}

export function buscarJogadorPorId(id: number): Promise<Jogador> {
    return request<Jogador>(`/jogadores/${id}`)
}
