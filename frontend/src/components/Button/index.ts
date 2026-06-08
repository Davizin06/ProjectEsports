import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Button = styled.button`
    background: ${theme.color.accent};
    color: #fff;
    border: none;
    border-radius: ${theme.radius};
    padding: 11px 18px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover:not(:disabled) {
        background: ${theme.color.accentHover};
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
    }
`
