import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
`

export const Toolbar = styled.div`
    display: flex;
`

export const PlacarForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    padding: 20px 24px;
    background: ${theme.color.surface};
    border: 1px solid ${theme.color.border};
`

export const PlacarTitle = styled.strong`
    font-size: 13px;
    text-transform: uppercase;
    color: ${theme.color.textMuted};
`

export const PlacarRow = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 16px;
`
