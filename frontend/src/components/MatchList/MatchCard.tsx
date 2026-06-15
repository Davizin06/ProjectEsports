import type { Partida } from "../../services/types"
import { Card, CountdownBadge, InfoArea, InfoSubtitle, InfoTitle, Label, MatchTime, StatusArea, StatusBadge, TeamName, TeamRow, Teams } from "./styles"

interface MatchCardProp {
    match: Partida
    onClick: () => void
}

function formatTime(dateTime: string) {
    return new Date(dateTime).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

function getRemainingTime(dateTime: string) {
    const now = new Date().getTime()
    const matchDate = new Date(dateTime).getTime()

    const difference = matchDate - now

    if (difference <= 0) {
        return 'Now'
    }

    const minutes = Math.floor(difference / 1000 / 60)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours <= 0) {
        return `${remainingMinutes}m`
    }

    return `${hours}h ${remainingMinutes}m`
}

function MatchCard({ match, onClick }: MatchCardProp) {
    const isFinished = match.duracao != null

    return (
        <Card type="button" onClick={onClick}>
            <MatchTime>
                {formatTime(match.dataHora)}
            </MatchTime>
            <Teams>
                <TeamRow>
                    <TeamName>{match.timeA?.nome ?? ''}</TeamName>
                </TeamRow>
                <TeamRow>
                    <TeamName>{match.timeB?.nome ?? ''}</TeamName>
                </TeamRow>
            </Teams>

            <StatusArea>
                {isFinished ? (
                    <StatusBadge $variant="finished">Finalizado</StatusBadge>
                ) : (
                    <>
                        <StatusBadge $variant="upcoming">Próximo</StatusBadge>
                        <CountdownBadge>
                            {getRemainingTime(match.dataHora)}
                        </CountdownBadge>
                    </>
                )}
            </StatusArea>
            <InfoArea>
                <Label>Campeonato</Label>
                <InfoTitle>
                    {match.campeonato?.nome ?? 'Nao informado'}
                </InfoTitle>
                <InfoSubtitle>
                    {match.campeonato?.jogo?.titulo ?? 'Jogo nao informado'}
                </InfoSubtitle>
            </InfoArea>

            <InfoArea>
                <Label>Vencedor</Label>
                <InfoTitle>
                    {match.vencedor?.nome ?? 'Pendente'}
                </InfoTitle>
            </InfoArea>
        </Card>
    )
}

export default MatchCard