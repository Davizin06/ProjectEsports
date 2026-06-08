import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Bar = styled.header`
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

export const Links = styled.nav`
    display: flex;
    gap: 4px;
`

export const NavLink = styled.button<{ $ativo: boolean }>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: ${theme.radius};
    color: ${({ $ativo }) => ($ativo ? theme.color.text : theme.color.textMuted)};
    background: ${({ $ativo }) => ($ativo ? theme.color.surfaceAlt : 'transparent')};
    transition: color 0.15s ease, background 0.15s ease;

    &:hover {
        color: ${theme.color.text};
    }
`
