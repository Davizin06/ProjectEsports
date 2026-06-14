export type GeneroJogo = "FPS" | "MOBA" | "BATTLE_ROYALE" | "SPORTS"

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

export interface Jogo {
    idJogo: number
    titulo: string
    genero: GeneroJogo
    versao: string | null
}

export interface NovoJogo {
    titulo: string
    genero: GeneroJogo
    versao: string | null
}

export interface AtualizarVersaoJogo {
    versao: string | null
}

export interface Campeonato {
    idCamp: number
    nome: string
    premiacao: number | null
    jogo: Jogo | null
}

export interface NovoCampeonato {
    nome: string
    premiacao: number | null
    jogoId: number | null
}

export interface AtualizarPremiacaoCampeonato {
    premiacao: number | null
}

export interface Partida {
    idPartida: number
    dataHora: string
    duracao: string | null
    campeonato: Campeonato | null
    timeA: Time | null
    timeB: Time | null
    vencedor: Time | null
    placarTimeA: number | null
    placarTimeB: number | null
}

export interface NovaPartida {
    dataHora: string
    campeonatoId: number | null
    timeAId: number | null
    timeBId: number | null
}

export interface FinalizarPartida {
    duracao: string
}

export interface AtualizarPlacar {
    placarTimeA: number
    placarTimeB: number
}

export interface Sumula {
    idSumula: number
    aprovadoJuiz: boolean
    partida: Partida | null
}

export interface NovaSumula {}

export interface DesempenhoJogador {
    idJogador: number
    idPartida: number
    jogador: Jogador | null
    partida: Partida | null
    kills: number
    deaths: number
    assists: number
}

export interface NovoDesempenho {
    idJogador: number
    idPartida: number
    kills: number
    deaths: number
    assists: number
}

export interface AtualizarKDA {
    kills: number
    deaths: number
    assists: number
}

export interface TransferenciaJogador {
    timeId: number | null
}

export interface JogadorDesempenho {
    idJogador: number
    nickname: string
    kills: number
    deaths: number
    assists: number
}

export interface TimeDesempenho {
    idTime: number
    nome: string
    jogadores: JogadorDesempenho[]
}

export interface DesempenhoPartida {
    timeA: TimeDesempenho
    timeB: TimeDesempenho
}
