import { useState } from 'react'
import type { FormEvent } from 'react'
import Field from '../../components/Field'
import FormCard from '../../components/FormCard'
import { Button } from '../../components/Button'
import { Alert } from '../../components/Alert'

const SENHA_ADMIN = 'admin123'

interface AdminLoginProps {
    onAcessoLiberado: () => void
}

function AdminLogin({ onAcessoLiberado }: AdminLoginProps) {
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState(false)

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        if (senha === SENHA_ADMIN) {
            sessionStorage.setItem('adminAutenticado', 'true')
            onAcessoLiberado()
            return
        }

        setErro(true)
        setSenha('')
    }

    return (
        <FormCard
            title="Acesso administrativo"
            subtitle="Digite a senha para acessar as páginas de cadastro."
            onSubmit={handleSubmit}
        >
            {erro && (
                <Alert $variant="error">
                    Senha incorreta. Tente novamente.
                </Alert>
            )}

            <Field
                id="senhaAdmin"
                label="Senha"
                type="password"
                placeholder="Digite a senha administrativa"
                value={senha}
                onChange={(e) => {
                    setSenha(e.target.value)
                    setErro(false)
                }}
                required
            />

            <Button type="submit" disabled={senha.trim() === ''}>
                Entrar
            </Button>
        </FormCard>
    )
}

export default AdminLogin
