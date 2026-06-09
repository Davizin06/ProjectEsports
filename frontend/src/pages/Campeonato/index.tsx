import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import Field from '../../components/Field'
import Select from '../../components/Select'
import FormCard from '../../components/FormCard'
import { Button } from '../../components/Button'
import { Alert } from '../../components/Alert'
import { cadastrarCampeonato } from '../../services/campeonatoService'
import { listarJogos } from '../../services/jogoService'
import type { Jogo } from '../../services/types'

interface Feedback {
    tipo: 'success' | 'error'
    texto: string
}

function CadastroCampeonato() {
    const [nome, setNome] = useState('')
    const [premiacao, setPremiacao] = useState('')
    const [jogoId, setJogoId] = useState('')
    const [jogos, setJogos] = useState<Jogo[]>([])
    const [enviando, setEnviando] = useState(false)
    const [feedback, setFeedback] = useState<Feedback | null>(null)

    useEffect(() => {
        async function carregarJogos() {
            try {
                const jogosCarregados = await listarJogos()
                setJogos(jogosCarregados)
                setFeedback(null)
            } catch (erro) {
                setFeedback({
                    tipo: 'error',
                    texto: 'Não foi possível carregar a lista de jogos.',
                })
            }
        }
        carregarJogos()
    }, [])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setFeedback(null)
        setEnviando(true)

        try {
            const campeonato = await cadastrarCampeonato({
                nome: nome.trim(),
                premiacao: premiacao ? Number(premiacao) : null,
                jogoId: jogoId ? Number(jogoId) : null,
            })
            setFeedback({
                tipo: 'success',
                texto: `Campeonato "${campeonato.nome}" cadastrado com sucesso (ID ${campeonato.idCampeonato}).`,
            })
            setNome('')
            setPremiacao('')
            setJogoId('')
        } catch (erro) {
            setFeedback({
                tipo: 'error',
                texto: erro instanceof Error ? erro.message : 'Não foi possível cadastrar o campeonato.',
            })
        } finally {
            setEnviando(false)
        }
    }

    return (
        <FormCard
            title="Cadastrar campeonato"
            subtitle="Adicione um campeonato e vincule-o a um jogo."
            onSubmit={handleSubmit}
        >
            {feedback && <Alert $variant={feedback.tipo}>{feedback.texto}</Alert>}

            <Field
                id="nome"
                label="Nome"
                placeholder="Ex.: CBLOL"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                maxLength={50}
                required
            />

            <Field
                id="premiacao"
                label="Premiação (R$)"
                type="number"
                placeholder="Ex.: 10000.00"
                value={premiacao}
                min={0}
                step="0.01"
                onChange={(e) => setPremiacao(e.target.value)}
            />

            <Select
                id="jogoId"
                label="Jogo"
                value={jogoId}
                onChange={(e) => setJogoId(e.target.value)}
                required
            >
 
                <option value="">Selecione um jogo</option>
                {jogos.map((jogo) => (
                    <option key={jogo.idJogo} value={jogo.idJogo}>
                        {jogo.titulo}
                    </option>
                ))}
            </Select>

            <Button type="submit" disabled={enviando || nome.trim() === '' || jogoId === ''}>
                {enviando ? 'Cadastrando...' : 'Cadastrar campeonato'}
            </Button>
        </FormCard>
    )
}

export default CadastroCampeonato

