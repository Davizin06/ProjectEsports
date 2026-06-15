import { useEffect, useState } from 'react'
import { listarPartidas } from '../../services/partidaService'
import type { Partida } from '../../services/types'
import MatchList from '../../components/MatchList/MatchList'

interface ListarPartidasProps {
    onSelectMatch: (partida: Partida) => void
}

function ListarPartidas({onSelectMatch}: ListarPartidasProps) {
    const [matches, setMatches] = useState<Partida[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadMatches() {
            try {
                setLoading(true)
                setError('')

                const data = await listarPartidas()
                setMatches(data)
            } catch (error) {
                console.error(error)
                setError('Erro ao carregar partidas.')
            } finally {
                setLoading(false)
            }
        }

        loadMatches()
    }, [])

    if (loading) {
        return <p>Carregando partidas...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    if (matches.length === 0) {
        return <p>Nenhuma partida cadastrada.</p>
    }

    return <MatchList matches={matches} onSelectMatch={onSelectMatch}/>
}

export default ListarPartidas