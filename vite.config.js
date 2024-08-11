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
    reporters: [
      'default',
      [
        'junit',
        {
          outputFile: './reports/junit.xml',
          classNameTemplate: '{classname}',
          titleTemplate: '{title}'
        }
      ]
    ]
  }
})
