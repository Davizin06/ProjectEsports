import type { TimeDesempenho } from '../../services/types'
import {
    Container,
    TeamBlock,
    TeamHeader,
    Table,
    EmptyRow,
} from './styles'

interface PlayerStatsProps {
    timeA: TimeDesempenho
    timeB: TimeDesempenho
}

function TeamTable({ time }: { time: TimeDesempenho }) {
    return (
        <TeamBlock>
            <TeamHeader>
                <strong>{time.nome}</strong>
            </TeamHeader>

            <Table>
                <thead>
                    <tr>
                        <th>Jogador</th>
                        <th>K</th>
                        <th>D</th>
                        <th>A</th>
                    </tr>
                </thead>

                <tbody>
                    {time.jogadores.length === 0 ? (
                        <tr>
                            <EmptyRow colSpan={4}>
                                Nenhum jogador neste time.
                            </EmptyRow>
                        </tr>
                    ) : (
                        time.jogadores.map((jogador) => (
                            <tr key={jogador.idJogador}>
                                <td>{jogador.nickname}</td>
                                <td>{jogador.kills}</td>
                                <td>{jogador.deaths}</td>
                                <td>{jogador.assists}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </TeamBlock>
    )
}

function PlayerStats({ timeA, timeB }: PlayerStatsProps) {
    return (
        <Container>
            <TeamTable time={timeA} />
            <TeamTable time={timeB} />
        </Container>
    )
}

export default PlayerStats
