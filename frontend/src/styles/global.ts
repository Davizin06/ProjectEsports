import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        background: ${theme.color.bg};
        color: ${theme.color.text};
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        font-size: 15px;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`
