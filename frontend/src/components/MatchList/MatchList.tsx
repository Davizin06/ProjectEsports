import type { Partida } from '../../services/types'
import MatchDay from './MatchDay'
import { Container } from './styles'

interface MatchListProps {
    matches: Partida[]
    onSelectMatch: (match: Partida) => void
}

function formatDate(dateTime: string) {
    return new Date(dateTime).toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}

function MatchList({ matches, onSelectMatch }: MatchListProps) {
    const sortedMatches = [...matches].sort(
        (a, b) =>
            new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime()
    )

    const matchesByDate = sortedMatches.reduce<Record<string, Partida[]>>(
        (groups, match) => {
            const date = formatDate(match.dataHora)

            if (!groups[date]) {
                groups[date] = []
            }

            groups[date].push(match)

            return groups
        },
        {}
    )

    return (
        <Container>
            {Object.entries(matchesByDate).map(([date, matchesOfDay]) => (
                <MatchDay
                    key={date}
                    date={date}
                    matches={matchesOfDay}
                    onSelectMatch={onSelectMatch}
                />
            ))}
        </Container>
    )
}

export default MatchList