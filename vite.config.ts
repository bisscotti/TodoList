import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@widgets': '/src/widgets',
      '@shared': '/src/shared',
      '@pages': '/src/pages',
      '@app': '/src/app',
      '@features': '/src/features',
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
