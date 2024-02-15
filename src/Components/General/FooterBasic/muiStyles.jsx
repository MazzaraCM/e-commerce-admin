import { styled } from '@mui/material/styles'
import { drawerWidth } from '../SideBar/muiStyles'

export const FooterStyled = styled('footer', {
  shouldForwardProp: ({ prop }) => prop !== 'open'
})(({ theme, open, sidebar }) => ({
  bottom: 0,
  padding: '10px',
  position: 'relative',
  margin: '0',
  textAlign: 'center',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  '@media (min-width: 600px)': {
    ...(sidebar === 'false' && {
      width: `calc(100% - (${theme.spacing(8)} + 1px))`,
      marginLeft: `calc(${theme.spacing(8)} + 1px)`
    }),
    ...(sidebar === 'false' && open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`
    })
  }
}))
