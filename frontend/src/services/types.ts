export interface Time {
    idTime: number
    nome: string
    dataFundacao: string | null
    vitoriasTotais: number
}

export interface NovoTime {
    nome: string
    dataFundacao: string | null
}

export interface Jogador {
    idJogador: number
    nickname: string
    idadeJogador: number | null
    salario: number | null
    time: Time | null
}

export interface NovoJogador {
    nickname: string
    idadeJogador: number | null
    salario: number | null
    timeId: number | null
}
