import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { BulbThemeChange } from '../../Common/bulbThemeChange/bulbThemeChange'
import { LanguageSelect } from '../../Common/languageSelect/languageSelect'
import './style.css'

export default function NavbarBasic () {
  return (
    <nav>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} />
        <BulbThemeChange />
        <LanguageSelect />
      </Toolbar>
    </nav>
  )
}
