import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import Field from '../../components/Field'
import Select from '../../components/Select'
import FormCard from '../../components/FormCard'
import { Button } from '../../components/Button'
import { Alert } from '../../components/Alert'
import { cadastrarJogador } from '../../services/jogadorService'
import { listarTimes } from '../../services/timeService'
import type { Time } from '../../services/types'

interface Feedback {
    tipo: 'success' | 'error'
    texto: string
}

function CadastroJogador() {
    const [nickname, setNickname] = useState('')
    const [idade, setIdade] = useState('')
    const [salario, setSalario] = useState('')
    const [timeId, setTimeId] = useState('')
    const [times, setTimes] = useState<Time[]>([])
    const [enviando, setEnviando] = useState(false)
    const [feedback, setFeedback] = useState<Feedback | null>(null)

    useEffect(() => {
        listarTimes()
            .then(setTimes)
            .catch(() =>
                setFeedback({
                    tipo: 'error',
                    texto: 'Não foi possível carregar a lista de times.',
                }),
            )
    }, [])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setFeedback(null)
        setEnviando(true)

        try {
            const jogador = await cadastrarJogador({
                nickname: nickname.trim(),
                idadeJogador: idade ? Number(idade) : null,
                salario: salario ? Number(salario) : null,
                timeId: timeId ? Number(timeId) : null,
            })
            setFeedback({
                tipo: 'success',
                texto: `Jogador "${jogador.nickname}" cadastrado com sucesso (ID ${jogador.idJogador}).`,
            })
            setNickname('')
            setIdade('')
            setSalario('')
            setTimeId('')
        } catch (erro) {
            setFeedback({
                tipo: 'error',
                texto: erro instanceof Error ? erro.message : 'Não foi possível cadastrar o jogador.',
            })
        } finally {
            setEnviando(false)
        }
    }

    return (
        <FormCard
            title="Cadastrar jogador"
            subtitle="Adicione um jogador e, se quiser, vincule-o a um time."
            onSubmit={handleSubmit}
        >
            {feedback && <Alert $variant={feedback.tipo}>{feedback.texto}</Alert>}

            <Field
                id="nickname"
                label="Nickname"
                placeholder="Ex.: aspas"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={50}
                required
            />

            <Field
                id="idade"
                label="Idade"
                type="number"
                placeholder="Ex.: 18"
                value={idade}
                min={16}
                onChange={(e) => setIdade(e.target.value)}
                hint="Mínimo de 16 anos para competir profissionalmente."
            />

            <Field
                id="salario"
                label="Salário (R$)"
                type="number"
                placeholder="Ex.: 5000.00"
                value={salario}
                min={0}
                step="0.01"
                onChange={(e) => setSalario(e.target.value)}
            />

            <Select
                id="timeId"
                label="Time"
                value={timeId}
                onChange={(e) => setTimeId(e.target.value)}
                hint="Opcional. Deixe em 'Sem time' para um jogador livre."
            >
                <option value="">Sem time</option>
                {times.map((time) => (
                    <option key={time.idTime} value={time.idTime}>
                        {time.nome}
                    </option>
                ))}
            </Select>

            <Button type="submit" disabled={enviando || nickname.trim() === ''}>
                {enviando ? 'Cadastrando...' : 'Cadastrar jogador'}
            </Button>
        </FormCard>
    )
}

export default CadastroJogador
