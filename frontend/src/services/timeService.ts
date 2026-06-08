import { request } from './api'
import type { NovoTime, Time } from './types'

export function cadastrarTime(dados: NovoTime): Promise<Time> {
    return request<Time>('/times', {
        method: 'POST',
        body: JSON.stringify(dados),
    })
}

export function listarTimes(): Promise<Time[]> {
    return request<Time[]>('/times')
}

export function buscarTimePorId(id: number): Promise<Time> {
    return request<Time>(`/times/${id}`)
}
