import { styled } from '@mui/material/styles'
// import { drawerWidth } from '../SideBar/muiStyles'
import MuiAppBar from '@mui/material/AppBar'
import { useMediaQuery } from '@mui/material'

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: ({ prop }) => prop !== 'open'
})(({ theme, open }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  return {
    width: isMobile ? '100%' : `calc(100% - (${theme.spacing(7)} + 1px))`,
    height: theme.mixins.toolbar.minHeight,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '@media (min-width: 600px)': {
      ...(open && {
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen
        })
      })
    }
  }
})
