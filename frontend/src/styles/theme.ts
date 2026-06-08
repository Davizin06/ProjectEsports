export const theme = {
    color: {
        bg: '#f5f5f5',
        surface: '#ffffff',
        surfaceAlt: '#ececec',
        border: '#d4d4d4',
        text: '#1f1f1f',
        textMuted: '#6b6b6b',
        accent: '#2563eb',
        accentHover: '#1d4ed8',
        danger: '#c0392b',
        success: '#2e7d46',
    },
    radius: '4px',
    maxWidth: '480px',
} as const

export type Theme = typeof theme
