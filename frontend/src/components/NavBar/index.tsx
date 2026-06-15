import type { Pagina } from '../../App'
import { Bar, Brand, NavLink, Links } from './styles'

interface NavBarProps {
    atual: Pagina
    onNavegar: (pagina: Pagina) => void
}

function NavBar({ atual, onNavegar }: NavBarProps) {
    return (
        <Bar>
            <Brand to="/">← Esports Manager</Brand>
            <Links>
                <NavLink
                    type="button"
                    $ativo={atual === 'time'}
                    onClick={() => onNavegar('time')}
                >
                    Times
                </NavLink>
                <NavLink
                    type="button"
                    $ativo={atual === 'jogador'}
                    onClick={() => onNavegar('jogador')}
                >
                    Jogadores
                </NavLink>
                <NavLink
                    type="button"
                    $ativo={atual === 'jogo'}
                    onClick={() => onNavegar('jogo')}
                >
                    Jogo
                </NavLink>
                <NavLink
                    type="button"
                    $ativo={atual === 'partida'}
                    onClick={() => onNavegar('partida')}
                >
                    Partida
                </NavLink>
                <NavLink
                    type="button"
                    $ativo={atual === 'campeonato'}
                    onClick={() => onNavegar('campeonato')}
                >
                    Campeonato
                </NavLink>
            </Links>
        </Bar>
    )
}

export default NavBar
