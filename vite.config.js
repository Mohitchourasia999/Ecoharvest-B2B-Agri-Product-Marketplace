import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Purpose: Vite build tool configuration
// Configures React plugin and dev server port
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
