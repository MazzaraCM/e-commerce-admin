import { useThemeContext } from '../../../Context/themes'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Button from '@mui/material/Button'
import { textStatic } from '../../../Themes/colors'

export function BulbThemeChange () {
  const { theme, toggleTheme } = useThemeContext()

  return (
    <Button variant='text' onClick={toggleTheme}>
      {theme.palette.mode === 'light'
        ? (
          <LightModeIcon style={{ color: textStatic() }} />
          )
        : (
          <DarkModeIcon style={{ color: textStatic() }} />
          )}
    </Button>
  )
}
