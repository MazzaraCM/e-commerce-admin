import { BulbThemeChange } from '../../Common/bulbThemeChange/bulbThemeChange'
import { LanguageSelect } from '../../Common/languageSelect/languageSelect'
import { AccountMenuAvatar } from '../../Common/accountMenuAvatar/accountMenuAvatar'
import { useSidebarContext } from '../../../Context/sidebar'
import { backgroundOpacity, textStatic } from '../../../Themes/colors'
import { LogoImgByTheme } from '../../../Docs/images/logos'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useMediaQuery } from '@mui/material'
import { AppBar } from './muiStyle'
import './style.css'
import { Link } from 'react-router-dom'

export default function NavbarAdmin ({ sidebar = true }) {
  const { openSidebar, handleSidebar } = useSidebarContext()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <AppBar
      className='navbarAdmin' position='fixed' style={{ backgroundColor: backgroundOpacity(), backgroundImage: 'none' }} elevation={0} open={openSidebar}
    >
      <Toolbar>
        {sidebar && isMobile && (
          <IconButton onClick={handleSidebar} size='large' edge='start' aria-label='menu'>
            <MenuIcon style={{ color: textStatic() }} />
          </IconButton>
        )}
        <Link to='/'>
          <LogoImgByTheme width='140px' display={isMobile ? 'none' : 'inherit'} />
        </Link>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} />
        <BulbThemeChange />
        <LanguageSelect />
        <AccountMenuAvatar />
      </Toolbar>
    </AppBar>
  )
}
