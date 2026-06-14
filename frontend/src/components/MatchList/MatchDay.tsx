import type { Partida } from '../../services/types'
import MatchCard from './MatchCard'
import { DayContainer, DayHeader, MatchListWrapper, TodayBadge } from './styles'

interface MatchDayProps {
    date: string
    matches: Partida[]
    onSelectMatch: (match: Partida) => void
}

function isToday(dateTime: string) {
    const today = new Date()
    const matchDate = new Date(dateTime)

    return (
        today.getDate() === matchDate.getDate() &&
        today.getMonth() === matchDate.getMonth() &&
        today.getFullYear() === matchDate.getFullYear()
    )
}

function MatchDay({ date, matches, onSelectMatch }: MatchDayProps) {
    const hasMatchToday = matches.some((match) => isToday(match.dataHora))

    return (
        <DayContainer>
            <DayHeader>
                <span>{date}</span>

                {hasMatchToday && <TodayBadge>Hoje</TodayBadge>}
            </DayHeader>

            <MatchListWrapper>
                {matches.map((match) => (
                    <MatchCard
                        key={match.idPartida}
                        match={match}
                        onClick={() => onSelectMatch(match)}
                    />
                ))}
            </MatchListWrapper>
        </DayContainer>
    )
}

export default MatchDay