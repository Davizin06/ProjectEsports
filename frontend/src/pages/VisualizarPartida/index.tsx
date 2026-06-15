import { useEffect, useState } from 'react'
import type { Partida, DesempenhoPartida } from '../../services/types'
import { listarDesempenhosDaPartida } from '../../services/desempenhoService'
import { atualizarPlacar } from '../../services/partidaService'
import MatchDetails from '../../components/MatchDetails'
import PlayerStats from '../../components/PlayerStats'
import Field from '../../components/Field'
import { Button } from '../../components/Button'
import { EmptyState } from '../../components/EmptyState'
import { BackButton } from '../../components/BackButton'
import { Wrapper, Toolbar, PlacarForm, PlacarTitle, PlacarRow } from './styles'

interface VisualizarPartidaProps {
    partida: Partida | null
    onVoltar: () => void
}

function VisualizarPartida({ partida, onVoltar }: VisualizarPartidaProps) {
    const [match, setMatch] = useState<Partida | null>(partida)
    const [desempenhos, setDesempenhos] = useState<DesempenhoPartida | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [placarA, setPlacarA] = useState('')
    const [placarB, setPlacarB] = useState('')
    const [salvandoPlacar, setSalvandoPlacar] = useState(false)

    useEffect(() => {
        setMatch(partida)
        setPlacarA(partida?.placarTimeA != null ? String(partida.placarTimeA) : '')
        setPlacarB(partida?.placarTimeB != null ? String(partida.placarTimeB) : '')
    }, [partida])

    useEffect(() => {
        if (!partida) {
            return
        }

        async function loadDesempenhos(idPartida: number) {
            try {
                setLoading(true)
                setError('')

                const data = await listarDesempenhosDaPartida(idPartida)
                setDesempenhos(data)
            } catch (err) {
                console.error(err)
                setError('Erro ao carregar os jogadores da partida.')
            } finally {
                setLoading(false)
            }
        }

        loadDesempenhos(partida.idPartida)
    }, [partida])

    if (!partida || !match) {
        return (
            <EmptyState>
                <p>Nenhuma partida selecionada.</p>

                <BackButton type="button" onClick={onVoltar}>
                    Voltar para partidas
                </BackButton>
            </EmptyState>
        )
    }

    async function handleSalvarPlacar(idPartida: number) {
        try {
            setSalvandoPlacar(true)
            setError('')

            const atualizada = await atualizarPlacar(idPartida, {
                placarTimeA: Number(placarA || 0),
                placarTimeB: Number(placarB || 0),
            })

            setMatch(atualizada)
        } catch (err) {
            console.error(err)
            setError('Erro ao salvar o placar.')
        } finally {
            setSalvandoPlacar(false)
        }
    }

    return (
        <Wrapper>
            <Toolbar>
                <BackButton type="button" onClick={onVoltar}>
                    ← Voltar
                </BackButton>
            </Toolbar>

            <MatchDetails match={match} />

            <PlacarForm>
                <PlacarTitle>Placar</PlacarTitle>

                <PlacarRow>
                    <Field
                        id="placarTimeA"
                        label="Time A"
                        type="number"
                        min={0}
                        value={placarA}
                        onChange={(e) => setPlacarA(e.target.value)}
                    />

                    <Field
                        id="placarTimeB"
                        label="Time B"
                        type="number"
                        min={0}
                        value={placarB}
                        onChange={(e) => setPlacarB(e.target.value)}
                    />

                    <Button
                        type="button"
                        onClick={() => handleSalvarPlacar(match.idPartida)}
                        disabled={salvandoPlacar}
                    >
                        {salvandoPlacar ? 'Salvando...' : 'Salvar placar'}
                    </Button>
                </PlacarRow>
            </PlacarForm>

            {loading && <p>Carregando jogadores...</p>}
            {error && <p>{error}</p>}
            {desempenhos && (
                <PlayerStats
                    timeA={desempenhos.timeA}
                    timeB={desempenhos.timeB}
                />
            )}
        </Wrapper>
    )
}

export default VisualizarPartida
