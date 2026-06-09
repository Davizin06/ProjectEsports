import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import Field from '../../components/Field'
import Select from '../../components/Select'
import FormCard from '../../components/FormCard'
import { Button } from '../../components/Button'
import { Alert } from '../../components/Alert'
import { cadastrarDesempenho } from '../../services/desempenhoService'
import { listarCampeonatos } from '../../services/campeonatoService'
import { listarPartidas } from '../../services/partidaService'
import { listarJogadores } from '../../services/jogadorService'
import type { Campeonato, Jogador, Partida } from '../../services/types'

interface Feedback {
    tipo: 'success' | 'error'
    texto: string
}

function CadastroDesempenho() {
    const [campeonatoId, setCampeonatoId] = useState('')
    const [partidaId, setPartidaId] = useState('')
    const [jogadorId, setJogadorId] = useState('')

    const [kills, setKills] = useState('')
    const [deaths, setDeaths] = useState('')
    const [assists, setAssists] = useState('')

    const [campeonatos, setCampeonatos] = useState<Campeonato[]>([])
    const [partidas, setPartidas] = useState<Partida[]>([])
    const [jogadores, setJogadores] = useState<Jogador[]>([])

    const [carregando, setCarregando] = useState(true)
    const [enviando, setEnviando] = useState(false)
    const [feedback, setFeedback] = useState<Feedback | null>(null)

    useEffect(() => {
        async function carregarDados() {
            try {
                const [
                    campeonatosCarregados,
                    partidasCarregadas,
                    jogadoresCarregados,
                ] = await Promise.all([
                    listarCampeonatos(),
                    listarPartidas(),
                    listarJogadores(),
                ])

                setCampeonatos(campeonatosCarregados)
                setPartidas(partidasCarregadas)
                setJogadores(jogadoresCarregados)
            } catch (erro) {
                console.error('Erro ao carregar dados:', erro)

                setFeedback({
                    tipo: 'error',
                    texto: 'Não foi possível carregar campeonatos, partidas ou jogadores.',
                })
            } finally {
                setCarregando(false)
            }
        }

        carregarDados()
    }, [])

const partidasFiltradas = useMemo(() => {
    if (!campeonatoId) {
        return []
    }

    return partidas.filter((partida) => {
        return partida.campeonato?.idCamp === Number(campeonatoId)
    })
}, [partidas, campeonatoId])    

const partidaSelecionada = useMemo(() => {
    if (!partidaId) {
        return null
    }

    return partidas.find((partida) => partida.idPartida === Number(partidaId)) ?? null
}, [partidas, partidaId])

const jogadoresFiltrados = useMemo(() => {
    if (!partidaSelecionada) {
        return []
    }

    const idTimeA = partidaSelecionada.timeA?.idTime
    const idTimeB = partidaSelecionada.timeB?.idTime

    return jogadores.filter((jogador) => {
        const idTimeJogador = jogador.time?.idTime

        return idTimeJogador === idTimeA || idTimeJogador === idTimeB
    })
}, [jogadores, partidaSelecionada])

    function handleSelecionarCampeonato(id: string) {
        setCampeonatoId(id)
        setPartidaId('')
        setJogadorId('')
        setFeedback(null)
    }

    function handleSelecionarPartida(id: string) {
        setPartidaId(id)
        setJogadorId('')
        setFeedback(null)
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setFeedback(null)
        setEnviando(true)

        try {
            const desempenho = await cadastrarDesempenho({
                idJogador: Number(jogadorId),
                idPartida: Number(partidaId),
                kills: Number(kills),
                deaths: Number(deaths),
                assists: Number(assists),
            })

            setFeedback({
                tipo: 'success',
                texto: `Desempenho cadastrado com sucesso para o jogador ID ${desempenho.idJogador}.`,
            })

            setJogadorId('')
            setKills('')
            setDeaths('')
            setAssists('')
        } catch (erro) {
            setFeedback({
                tipo: 'error',
                texto:
                    erro instanceof Error
                        ? erro.message
                        : 'Não foi possível cadastrar o desempenho.',
            })
        } finally {
            setEnviando(false)
        }
    }

    const formularioInvalido =
        campeonatoId === '' ||
        partidaId === '' ||
        jogadorId === '' ||
        kills === '' ||
        deaths === '' ||
        assists === ''

    return (
        <FormCard
            title="Cadastrar desempenho"
            subtitle="Selecione o campeonato, a partida e registre o KDA do jogador."
            onSubmit={handleSubmit}
        >
            {feedback && <Alert $variant={feedback.tipo}>{feedback.texto}</Alert>}
            
            <Select
                id="campeonatoId"
                label="Campeonato"
                value={campeonatoId}
                onChange={(e) => handleSelecionarCampeonato(e.target.value)}
                disabled={carregando}
                required
            >
                <option value="">Selecione um campeonato</option>

                {campeonatos.map((campeonato) => (
                    <option key={campeonato.idCamp} value={campeonato.idCamp}>
                        {campeonato.nome}
                    </option>
                ))}
            </Select>

            <Select
                id="partidaId"
                label="Partida"
                value={partidaId}
                onChange={(e) => handleSelecionarPartida(e.target.value)}
                disabled={carregando || campeonatoId === ''}
                required
            >
                <option value="">
                    {campeonatoId
                        ? 'Selecione uma partida'
                        : 'Selecione um campeonato primeiro'}
                </option>

                {partidasFiltradas.map((partida) => (
                    <option key={partida.idPartida} value={partida.idPartida}>
                        Partida #{partida.idPartida}
                        {partida.dataHora ? ` - ${partida.dataHora}` : ''}
                    </option>
                ))}
            </Select>

            <Select
                id="jogadorId"
                label="Jogador"
                value={jogadorId}
                onChange={(e) => setJogadorId(e.target.value)}
                disabled={carregando || partidaId === ''}
                required
            >
                <option value="">
                    {partidaId
                        ? 'Selecione um jogador'
                        : 'Selecione uma partida primeiro'}
                </option>

                {jogadoresFiltrados.map((jogador) => (
                    <option key={jogador.idJogador} value={jogador.idJogador}>
                        {jogador.nickname} - {jogador.time?.nome}
                    </option>
                ))}
            </Select>

            <Field
                id="kills"
                label="Kills"
                type="number"
                placeholder="Ex.: 20"
                value={kills}
                min={0}
                onChange={(e) => setKills(e.target.value)}
                required
            />

            <Field
                id="deaths"
                label="Deaths"
                type="number"
                placeholder="Ex.: 8"
                value={deaths}
                min={0}
                onChange={(e) => setDeaths(e.target.value)}
                required
            />

            <Field
                id="assists"
                label="Assists"
                type="number"
                placeholder="Ex.: 10"
                value={assists}
                min={0}
                onChange={(e) => setAssists(e.target.value)}
                required
            />

            <Button type="submit" disabled={enviando || formularioInvalido}>
                {enviando ? 'Cadastrando...' : 'Cadastrar desempenho'}
            </Button>
        </FormCard>
    )
}

export default CadastroDesempenho
