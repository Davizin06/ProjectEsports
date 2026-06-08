import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Alert = styled.div<{ $variant: 'success' | 'error' }>`
    border-radius: ${theme.radius};
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid
        ${({ $variant }) =>
            $variant === 'success' ? theme.color.success : theme.color.danger};
    color: ${({ $variant }) =>
        $variant === 'success' ? theme.color.success : theme.color.danger};
    background: ${({ $variant }) =>
        $variant === 'success' ? 'rgba(90, 166, 107, 0.1)' : 'rgba(214, 91, 91, 0.1)'};
`
