import { useEffect } from 'react'
import RoutesIndex from './Routes/routes'
import { BrowserRouter } from 'react-router-dom'
import { useLanguage } from './Context/languages'
import { IntlProvider } from 'react-intl'
import { userAuth } from './Hooks/Models/userAuth'
import { useTheme } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import './App.css'

export function App () {
  const { locale, languageTexts } = useLanguage()
  const { checkAuthToken } = userAuth()
  const theme = useTheme()

  document.body.style.backgroundColor = theme.palette.background.opacity

  useEffect(() => {
    checkAuthToken()
  }, [])

  return (
    <IntlProvider locale={locale} messages={languageTexts[locale]}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BrowserRouter>
          <RoutesIndex />
        </BrowserRouter>
      </LocalizationProvider>
    </IntlProvider>
  )
}
