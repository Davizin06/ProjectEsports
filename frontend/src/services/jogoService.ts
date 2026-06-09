import { request } from './api'
import type {
    Jogo,
    NovoJogo,
    AtualizarVersaoJogo,
} from './types'

export function cadastrarJogo(dados: NovoJogo): Promise<Jogo> {
    return request<Jogo>('/jogos', {
        method: 'POST',
        body: JSON.stringify(dados),
    })
}

export function listarJogos(): Promise<Jogo[]> {
    return request<Jogo[]>('/jogos')
}

export function buscarJogoPorId(id: number): Promise<Jogo> {
    return request<Jogo>(`/jogos/${id}`)
}

export function atualizarVersaoJogo(
    id: number,
    dados: AtualizarVersaoJogo
): Promise<Jogo> {
    return request<Jogo>(`/jogos/${id}/versao`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    })
}
