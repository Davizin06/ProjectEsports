import { useState } from 'react'
import NavBar from './components/NavBar'
import CadastroTime from './pages/CadastroTime'
import CadastroJogador from './pages/CadastroJogador'
import { Main } from './styles'

export type Pagina = 'time' | 'jogador'

function App() {
    const [pagina, setPagina] = useState<Pagina>('time')

    return (
        <>
            <NavBar atual={pagina} onNavegar={setPagina} />
            <Main>
                {pagina === 'time' ? <CadastroTime /> : <CadastroJogador />}
            </Main>
        </>
    )
}

export default App
