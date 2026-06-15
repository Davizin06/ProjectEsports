import styled from 'styled-components'
import { theme } from '../../styles/theme'

export const PageStack = styled.div`
    width: 100%;
    max-width: ${theme.maxWidth};
    display: flex;
    flex-direction: column;
    gap: 24px;
`
