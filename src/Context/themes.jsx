import React, { createContext, useContext, useState, useMemo } from 'react'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { themes } from '../Themes/theme'
import { getCookie, setCookie } from '../Utils/utils'

const ThemeContext = createContext()

export function useThemeContext () {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

function initializeUserTheme (userTheme) {
  if (!userTheme) {
    setCookie({ cookie: 'theme-selected', value: JSON.stringify(themes.colorPaletteLight[0]), expires: 30, secure: false })
  }
}

export function ThemeProvider ({ children }) {
  const userTheme = getCookie({ cookie: 'theme-selected' })
  initializeUserTheme(userTheme)

  const userSelectedTheme = JSON.parse(userTheme ?? JSON.stringify(themes.colorPaletteLight[0]))
  const userSelectedThemeMode = userSelectedTheme.palette.mode === 'dark' ? 'colorPaletteDark' : 'colorPaletteLight'
  const [themeSelected, setThemeSelected] = useState(themes[userSelectedThemeMode][userSelectedTheme.palette.theme])

  const changeTheme = (newTheme) => {
    setThemeSelected(newTheme)
  }

  const toggleTheme = () => {
    const updatedTheme = userSelectedThemeMode === 'colorPaletteLight' ? 'colorPaletteDark' : 'colorPaletteLight'
    const updatedThemeObject = themes[updatedTheme][userSelectedTheme.palette.theme]
    setCookie({ cookie: 'theme-selected', value: JSON.stringify(updatedThemeObject), expires: 30, secure: false })
    setThemeSelected(updatedThemeObject)
  }

  const theme = useMemo(() => {
    return createTheme(themeSelected)
  }, [themeSelected])

  return (
    <ThemeContext.Provider value={{ theme: themeSelected, changeTheme, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
