import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

export const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.text};
`

export const Input = styled.input`
    background: ${theme.color.bg};
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius};
    color: ${theme.color.text};
    padding: 10px 12px;
    font-size: 15px;
    width: 100%;
    transition: border-color 0.15s ease;

    &::placeholder {
        color: ${theme.color.textMuted};
    }

    &:focus {
        outline: none;
        border-color: ${theme.color.accent};
    }
`

export const Hint = styled.span`
    font-size: 12px;
    color: ${theme.color.textMuted};
`
