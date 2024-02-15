import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LanguageProvider } from './src/Context/languages'
import { UserProvider } from './src/Context/user'
import { ThemeProvider } from './src/Context/themes'
import CssBaseline from '@mui/material/CssBaseline'
import { App } from './src/App'

const root = createRoot(document.getElementById('app'))
root.render(
  <StrictMode>
    <UserProvider>
      <LanguageProvider>
        <ThemeProvider>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </LanguageProvider>
    </UserProvider>
  </StrictMode>
)
