import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),           // ← React plugin must be included
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://leetcode-api-pied.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})


