import { useState } from 'react'
import type { FormEvent } from 'react'
import Field from '../../components/Field'
import Select from '../../components/Select'
import FormCard from '../../components/FormCard'
import { Button } from '../../components/Button'
import { Alert } from '../../components/Alert'
import { cadastrarJogo } from '../../services/jogoService'

interface Feedback {
    tipo: 'success' | 'error'
    texto: string
}

function CadastroJogo() {
    const [titulo, setTitulo] = useState('')
    const [genero, setGenero] = useState('')
    const [versao, setVersao] = useState('')
    const [enviando, setEnviando] = useState(false)
    const [feedback, setFeedback] = useState<Feedback | null>(null)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        setFeedback(null)
        setEnviando(true)

        try {
            const jogo = await cadastrarJogo({
                titulo: titulo.trim(),
                genero,
                versao: versao.trim() || null,
            })

            setFeedback({
                tipo: 'success',
                texto: `Jogo "${jogo.titulo}" cadastrado com sucesso.`,
            })

            setTitulo('')
            setGenero('')
            setVersao('')
        } catch (erro) {
            setFeedback({
                tipo: 'error',
                texto:
                    erro instanceof Error
                        ? erro.message
                        : 'Não foi possível cadastrar o jogo.',
            })
        } finally {
            setEnviando(false)
        }
    }

    return (
        <FormCard
            title="Cadastrar jogo"
            subtitle="Adicione um jogo ao sistema de campeonatos."
            onSubmit={handleSubmit}
        >
            {feedback && <Alert $variant={feedback.tipo}>{feedback.texto}</Alert>}

            <Field
                id="titulo"
                label="Título"
                placeholder="Ex.: Valorant"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                maxLength={50}
                required
            />

            <Select
                id="genero"
                label="Gênero"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                required
            >
                <option value="">Selecione um gênero</option>
                <option value="FPS">FPS</option>
                <option value="MOBA">MOBA</option>
                <option value="BATTLE_ROYALE">Battle Royale</option>
                <option value="SPORTS">Sports</option>
            </Select>

            <Field
                id="versao"
                label="Versão"
                placeholder="Ex.: 1.0.0"
                value={versao}
                onChange={(e) => setVersao(e.target.value)}
                maxLength={30}
            />

            <Button
                type="submit"
                disabled={enviando || titulo.trim() === '' || genero === ''}
            >
                {enviando ? 'Cadastrando...' : 'Cadastrar jogo'}
            </Button>
        </FormCard>
    )
}

export default CadastroJogo
