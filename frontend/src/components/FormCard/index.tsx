import type { FormHTMLAttributes, ReactNode } from 'react'
import { Card, Header, Subtitle, Title } from './styles'

interface FormCardProps extends FormHTMLAttributes<HTMLFormElement> {
    title: string
    subtitle?: string
    children: ReactNode
}

function FormCard({ title, subtitle, children, ...formProps }: FormCardProps) {
    return (
        <Card {...formProps}>
            <Header>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </Header>
            {children}
        </Card>
    )
}

export default FormCard
