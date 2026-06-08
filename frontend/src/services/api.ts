export async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    })

    if (!response.ok) {
        throw new Error(await extrairMensagemDeErro(response))
    }

    return (await response.json()) as T
}

async function extrairMensagemDeErro(response: Response): Promise<string> {
    try {
        const corpo = await response.text()
        if (!corpo) return `Falha na requisição (${response.status})`

        try {
            const json = JSON.parse(corpo)
            return json.message || json.error || corpo
        } catch {
            return corpo
        }
    } catch {
        return `Falha na requisição (${response.status})`
    }
}
