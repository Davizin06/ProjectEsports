import type { Partida } from '../../services/types'
import {
    Container,
    Header,
    ChampionshipInfo,
    DateInfo,
    Scoreboard,
    TeamName,
    Score,
    Versus,
    Details,
    DetailItem,
} from './styles'

interface MatchDetailsProps {
    match: Partida
}

function formatDateTime(dateTime: string) {
    return new Date(dateTime).toLocaleString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function MatchDetails({ match }: MatchDetailsProps) {
    return (
        <Container>
            <Header>
                <ChampionshipInfo>
                    <strong>
                        {match.campeonato?.nome ?? 'Campeonato não informado'}
                    </strong>

                    <span>
                        {match.campeonato?.jogo?.titulo ?? 'Jogo não informado'}
                    </span>

                    <small>
                        Patch {match.campeonato?.jogo?.versao ?? 'Não informado'}
                    </small>
                </ChampionshipInfo>

                <DateInfo>
                    <span>{formatDateTime(match.dataHora)}</span>

                    <em>
                        {match.duracao
                            ? `Duração: ${match.duracao}`
                            : 'Partida pendente'}
                    </em>
                </DateInfo>
            </Header>

            <Scoreboard>
                <TeamName>{match.timeA?.nome ?? 'Time A'}</TeamName>

                <Score>
                    <span>{match.placarTimeA ?? '-'}</span>
                    <Versus>:</Versus>
                    <span>{match.placarTimeB ?? '-'}</span>
                </Score>

                <TeamName>{match.timeB?.nome ?? 'Time B'}</TeamName>
            </Scoreboard>

            <Details>
                <DetailItem>
                    <span>Premiação</span>

                    <strong>
                        {match.campeonato?.premiacao?.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }) ?? 'Não informada'}
                    </strong>
                </DetailItem>

                <DetailItem>
                    <span>Gênero</span>

                    <strong>
                        {match.campeonato?.jogo?.genero ?? 'Não informado'}
                    </strong>
                </DetailItem>

                <DetailItem>
                    <span>Vencedor</span>

                    <strong>
                        {match.vencedor?.nome ?? 'Pendente'}
                    </strong>
                </DetailItem>
            </Details>
        </Container>
    )
}

export default MatchDetails