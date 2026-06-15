import { useState } from 'react'
import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
} from 'react-router-dom'
import NavBar from './components/NavBar'
import Time from './pages/Time'
import Jogador from './pages/Jogador'
import Jogo from './pages/Jogo'
import Partida from './pages/Partida'
import Campeonato from './pages/Campeonato'
import ListarPartidas from './pages/ListarPartidas'
import VisualizarPartida from './pages/VisualizarPartida'
import AdminLogin from './pages/AdminLogin'
import type { Partida as PartidaType } from './services/types'
import { Main, TopBar, Brand, TopLink } from './styles'

export type Pagina =
    | 'time'
    | 'jogador'
    | 'jogo'
    | 'partida'
    | 'campeonato'

function PublicHeader() {
    return (
        <TopBar>
            <Brand>Esports Manager</Brand>
            <TopLink to="/admin">Administração</TopLink>
        </TopBar>
    )
}

function HomePartidas() {
    const navigate = useNavigate()

    return (
        <>
            <PublicHeader />

            <Main>
                <ListarPartidas
                    onSelectMatch={(partida) =>
                        navigate(`/partidas/${partida.idPartida}`, {
                            state: { partida },
                        })
                    }
                />
            </Main>
        </>
    )
}

function VisualizarPartidaRoute() {
    const navigate = useNavigate()
    const location = useLocation()
    const state = location.state as { partida?: PartidaType } | null

    return (
        <>
            <PublicHeader />

            <Main>
                <VisualizarPartida
                    partida={state?.partida ?? null}
                    onVoltar={() => navigate('/')}
                />
            </Main>
        </>
    )
}

function Admin() {
    const [pagina, setPagina] = useState<Pagina>('time')

    function renderizarPagina() {
        switch (pagina) {
            case 'time':
                return <Time />

            case 'jogador':
                return <Jogador />

            case 'jogo':
                return <Jogo />

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

            <Main>{renderizarPagina()}</Main>
        </>
    )
}

function AdminRoute() {
    const [adminAutenticado, setAdminAutenticado] = useState(() => {
        return sessionStorage.getItem('adminAutenticado') === 'true'
    })

    if (!adminAutenticado) {
        return (
            <>
                <PublicHeader />

                <Main>
                    <AdminLogin
                        onAcessoLiberado={() => setAdminAutenticado(true)}
                    />
                </Main>
            </>
        )
    }

    return <Admin />
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePartidas />} />
            <Route path="/partidas/:id" element={<VisualizarPartidaRoute />} />
            <Route path="/admin" element={<AdminRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App
