import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Card = styled.form`
    width: 100%;
    max-width: ${theme.maxWidth};
    background: ${theme.color.surface};
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius};
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
`

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${theme.color.border};
`

export const Title = styled.h1`
    font-size: 20px;
    font-weight: 600;
`

export const Subtitle = styled.p`
    font-size: 14px;
    color: ${theme.color.textMuted};
`
