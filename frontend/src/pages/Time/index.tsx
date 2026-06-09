import { useState } from 'react'
import type { FormEvent } from 'react'
import Field from '../../components/Field'
import FormCard from '../../components/FormCard'
import { Button } from '../../components/Button'
import { Alert } from '../../components/Alert'
import { cadastrarTime } from '../../services/timeService'

interface Feedback {
    tipo: 'success' | 'error'
    texto: string
}

function CadastroTime() {
    const [nome, setNome] = useState('')
    const [dataFundacao, setDataFundacao] = useState('')
    const [enviando, setEnviando] = useState(false)
    const [feedback, setFeedback] = useState<Feedback | null>(null)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setFeedback(null)
        setEnviando(true)

        try {
            const time = await cadastrarTime({
                nome: nome.trim(),
                dataFundacao: dataFundacao || null,
            })
            setFeedback({
                tipo: 'success',
                texto: `Time "${time.nome}" cadastrado com sucesso (ID ${time.idTime}).`,
            })
            setNome('')
            setDataFundacao('')
        } catch (erro) {
            setFeedback({
                tipo: 'error',
                texto: erro instanceof Error ? erro.message : 'Não foi possível cadastrar o time.',
            })
        } finally {
            setEnviando(false)
        }
    }

    return (
        <FormCard
            title="Cadastrar time"
            subtitle="Registre uma nova organização para a competição."
            onSubmit={handleSubmit}
        >
            {feedback && <Alert $variant={feedback.tipo}>{feedback.texto}</Alert>}

            <Field
                id="nome"
                label="Nome do time"
                placeholder="Ex.: LOUD"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                maxLength={100}
                required
            />

            <Field
                id="dataFundacao"
                label="Data de fundação"
                type="date"
                value={dataFundacao}
                max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDataFundacao(e.target.value)}
                hint="Opcional. Não pode ser uma data futura."
            />

            <Button type="submit" disabled={enviando || nome.trim() === ''}>
                {enviando ? 'Cadastrando...' : 'Cadastrar time'}
            </Button>
        </FormCard>
    )
}

export default CadastroTime
