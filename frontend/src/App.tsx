import { useState } from 'react'
import NavBar from './components/NavBar'
import CadastroTime from './pages/CadastroTime'
import CadastroJogador from './pages/CadastroJogador'
import CadastroJogo from './pages/CadastroJogo'
import CadastroDesempenho from './pages/CadastroDesempenho'
import CadastroPartida from './pages/CadastroPartida'
import CadastroCampeonato from './pages/CadastroCampeonato'
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
                return <CadastroTime />

            case 'jogador':
                return <CadastroJogador />

            case 'jogo':
                return <CadastroJogo />

            case 'desempenho':
                return <CadastroDesempenho />

            case 'partida':
                return <CadastroPartida />

            case 'campeonato':
                return <CadastroCampeonato />

            default:
                return <CadastroTime />
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
