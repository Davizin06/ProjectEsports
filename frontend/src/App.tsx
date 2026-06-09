import { useState } from 'react'
import NavBar from './components/NavBar'
import Time from './pages/Time'
import Jogador from './pages/Jogador'
import Jogo from './pages/Jogo'
import Desempenho from './pages/Desempenho'
import Partida from './pages/Partida'
import Campeonato from './pages/Campeonato'
import { Main } from './styles'

export type Pagina =
    | 'time'
    | 'jogador'
    | 'jogo'
    | 'desempenho'
    | 'partida'
    | 'campeonato'

function App() {
    const [pagina, setPagina] = useState<Pagina>('time')

    function renderizarPagina() {
        switch (pagina) {
            case 'time':
                return <Time />

            case 'jogador':
                return <Jogador />

            case 'jogo':
                return <Jogo />

            case 'desempenho':
                return <Desempenho />

            case 'partida':
                return <Partida />

            case 'campeonato':
                return <Campeonato />

            default:
                return <Time />
        }
    }

    return (
        <>
            <NavBar atual={pagina} onNavegar={setPagina} />

            <Main>
                {renderizarPagina()}
            </Main>
        </>
    )
}

export default App
