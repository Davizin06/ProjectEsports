import { request } from './api'
import type {
    DesempenhoJogador,
    NovoDesempenho,
    AtualizarKDA,
    DesempenhoPartida,
} from './types'

export function cadastrarDesempenho(
    dados: NovoDesempenho,
): Promise<DesempenhoJogador> {
    return request<DesempenhoJogador>('/desempenhos', {
        method: 'POST',
        body: JSON.stringify(dados),
    })
}

export function buscarDesempenho(
    idJogador: number,
    idPartida: number,
): Promise<DesempenhoJogador> {
    return request<DesempenhoJogador>(
        `/desempenhos/${idJogador}/${idPartida}`,
    )
}

export function atualizarKDA(
    idJogador: number,
    idPartida: number,
    dados: AtualizarKDA,
): Promise<DesempenhoJogador> {
    return request<DesempenhoJogador>(
        `/desempenhos/${idJogador}/${idPartida}/kda`,
        {
            method: 'PUT',
            body: JSON.stringify(dados),
        },
    )
}

export function listarDesempenhosDaPartida(
    idPartida: number,
): Promise<DesempenhoPartida> {
    return request<DesempenhoPartida>(`/partidas/${idPartida}/desempenhos`)
}
