import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Encaminha as chamadas da API para o backend Spring Boot (porta 8080),
      // evitando problemas de CORS durante o desenvolvimento.
      '/times': 'http://localhost:8080',
      '/jogadores': 'http://localhost:8080',
      '/jogos': 'http://localhost:8080',
      '/desempenhos': 'http://localhost:8080',
      '/partidas': 'http://localhost:8080',
      '/campeonatos': 'http://localhost:8080',



    },
  },
})
