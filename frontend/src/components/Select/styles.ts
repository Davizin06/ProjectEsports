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

export const StyledSelect = styled.select`
    appearance: none;
    background: ${theme.color.bg};
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius};
    color: ${theme.color.text};
    padding: 10px 12px;
    font-size: 15px;
    width: 100%;
    cursor: pointer;
    transition: border-color 0.15s ease;

    /* Seta personalizada */
    background-image: linear-gradient(45deg, transparent 50%, ${theme.color.textMuted} 50%),
        linear-gradient(135deg, ${theme.color.textMuted} 50%, transparent 50%);
    background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%;
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
    padding-right: 36px;

    &:focus {
        outline: none;
        border-color: ${theme.color.accent};
    }

    option {
        background: ${theme.color.surface};
        color: ${theme.color.text};
    }
`

export const Hint = styled.span`
    font-size: 12px;
    color: ${theme.color.textMuted};
`
