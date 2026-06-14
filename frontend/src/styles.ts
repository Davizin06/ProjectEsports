import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from './styles/theme'

export const Main = styled.main`
    display: flex;
    justify-content: center;
    padding: 48px 24px;
`

export const TopBar = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 24px;
    background: ${theme.color.surface};
    border-bottom: 1px solid ${theme.color.border};
`

export const Brand = styled.span`
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
`

export const TopLink = styled(Link)`
    font-size: 14px;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: ${theme.radius};
    color: ${theme.color.textMuted};
    text-decoration: none;
    transition: color 0.15s ease, background 0.15s ease;

    &:hover {
        color: ${theme.color.text};
        background: ${theme.color.surfaceAlt};
    }
`
