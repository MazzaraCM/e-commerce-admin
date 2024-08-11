import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    },
    reporters: ['default', 'junit'],
    outputFile: 'reports/junit.xml'
  }
})
