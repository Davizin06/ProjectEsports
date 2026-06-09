import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import Field from '../../components/Field'
import Select from '../../components/Select'
import FormCard from '../../components/FormCard'
import { Button } from '../../components/Button'
import { Alert } from '../../components/Alert'
import { cadastrarPartida } from '../../services/partidaService'
import { listarCampeonatos } from '../../services/campeonatoService'
import { listarTimes } from '../../services/timeService'
import type { Campeonato, Time } from '../../services/types'

interface Feedback {
    tipo: 'success' | 'error'
    texto: string
}

function CadastroPartida() {
    const [dataHora, setDataHora] = useState('')
    const [campeonatoId, setCampeonatoId] = useState('')
    const [timeAId, setTimeAId] = useState('')
    const [timeBId, setTimeBId] = useState('')

    const [campeonatos, setCampeonatos] = useState<Campeonato[]>([])
    const [times, setTimes] = useState<Time[]>([])

    const [carregando, setCarregando] = useState(true)
    const [enviando, setEnviando] = useState(false)
    const [feedback, setFeedback] = useState<Feedback | null>(null)

    useEffect(() => {
        async function carregarDados() {
            try {
                const [campeonatosCarregados, timesCarregados] =
                    await Promise.all([listarCampeonatos(), listarTimes()])

                setCampeonatos(campeonatosCarregados)
                setTimes(timesCarregados)
            } catch (erro) {
                console.error('Erro ao carregar dados:', erro)

                setFeedback({
                    tipo: 'error',
                    texto: 'Não foi possível carregar campeonatos ou times.',
                })
            } finally {
                setCarregando(false)
            }
        }

        carregarDados()
    }, [])

    const timesDisponiveisParaB = useMemo(() => {
        if (!timeAId) {
            return times
        }

        return times.filter((time) => time.idTime !== Number(timeAId))
    }, [times, timeAId])

    function handleSelecionarTimeA(id: string) {
        setTimeAId(id)

        if (id === timeBId) {
            setTimeBId('')
        }

        setFeedback(null)
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setFeedback(null)
        setEnviando(true)

        try {
            const dataHoraFormatada =
                dataHora.length === 16 ? `${dataHora}:00` : dataHora

            const partida = await cadastrarPartida({
                dataHora: dataHoraFormatada,
                campeonatoId: Number(campeonatoId),
                timeAId: Number(timeAId),
                timeBId: Number(timeBId),
            })

            setFeedback({
                tipo: 'success',
                texto: `Partida #${partida.idPartida} cadastrada com sucesso.`,
            })

            setDataHora('')
            setCampeonatoId('')
            setTimeAId('')
            setTimeBId('')
        } catch (erro) {
            setFeedback({
                tipo: 'error',
                texto:
                    erro instanceof Error
                        ? erro.message
                        : 'Não foi possível cadastrar a partida.',
            })
        } finally {
            setEnviando(false)
        }
    }

    const formularioInvalido =
        dataHora === '' ||
        campeonatoId === '' ||
        timeAId === '' ||
        timeBId === '' ||
        timeAId === timeBId

    return (
        <FormCard
            title="Cadastrar partida"
            subtitle="Agende uma partida vinculando campeonato e os dois times participantes."
            onSubmit={handleSubmit}
        >
            {feedback && <Alert $variant={feedback.tipo}>{feedback.texto}</Alert>}

            <Select
                id="campeonatoId"
                label="Campeonato"
                value={campeonatoId}
                onChange={(e) => setCampeonatoId(e.target.value)}
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
                id="timeAId"
                label="Time A"
                value={timeAId}
                onChange={(e) => handleSelecionarTimeA(e.target.value)}
                disabled={carregando}
                required
            >
                <option value="">Selecione o Time A</option>

                {times.map((time) => (
                    <option key={time.idTime} value={time.idTime}>
                        {time.nome}
                    </option>
                ))}
            </Select>

            <Select
                id="timeBId"
                label="Time B"
                value={timeBId}
                onChange={(e) => setTimeBId(e.target.value)}
                disabled={carregando || timeAId === ''}
                required
            >
                <option value="">
                    {timeAId ? 'Selecione o Time B' : 'Selecione o Time A primeiro'}
                </option>

                {timesDisponiveisParaB.map((time) => (
                    <option key={time.idTime} value={time.idTime}>
                        {time.nome}
                    </option>
                ))}
            </Select>

            <Field
                id="dataHora"
                label="Data e hora"
                type="datetime-local"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
                required
            />

            <Button type="submit" disabled={enviando || formularioInvalido}>
                {enviando ? 'Cadastrando...' : 'Cadastrar partida'}
            </Button>
        </FormCard>
    )
}

export default CadastroPartida
