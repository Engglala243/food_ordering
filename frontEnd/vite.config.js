import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/payment': {  // Match your API path exactly
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
