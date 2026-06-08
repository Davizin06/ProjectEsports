import type { Pagina } from '../../App'
import { Bar, Brand, NavLink, Links } from './styles'

interface NavBarProps {
    atual: Pagina
    onNavegar: (pagina: Pagina) => void
}

function NavBar({ atual, onNavegar }: NavBarProps) {
    return (
        <Bar>
            <Brand>Esports Manager</Brand>
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
            </Links>
        </Bar>
    )
}

export default NavBar
