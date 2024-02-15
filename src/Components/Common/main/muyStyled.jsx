import { styled } from '@mui/material/styles'
import { drawerWidth } from '../../General/SideBar/muiStyles'
import { useSidebarContext } from '../../../Context/sidebar'
import { useMediaQuery } from '@mui/material'

export const BoxStyled = styled('main', {
  shouldForwardProp: ({ prop }) => prop !== 'open'
})(({ theme, open, sidebar }) => {
  const { openByHover } = useSidebarContext()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  return {

    minHeight: '100vh',
    padding: isMobile ? '0 10px 10px' : '10px 50px',
    // boxShadow: theme.shadows[2],
    marginTop: theme.mixins.toolbar.minHeight,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: '100%',
    maxWidth: '1024px',
    margin: `${theme.mixins.toolbar.minHeight}px auto 0`,

    '@media (max-width: 1504px) and (min-width: 600px)': {
      ...(sidebar === 'false' && {
        width: `calc(100% - (${theme.spacing(8)} + 1px))`,
        marginLeft: `calc(${theme.spacing(8)} + 1px)`
      }),
      ...(sidebar === 'false' && open && !openByHover && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`
      })
    }
  }

  // '@media (min-width: 600px)': {
  //   ...(sidebar === 'false' && {
  //     width: `calc(100% - (${theme.spacing(8)} + 1px))`,
  //     marginLeft: `calc(${theme.spacing(8)} + 1px)`
  //   }),
  //   ...(sidebar === 'false' && open && !openByHover && {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: `${drawerWidth}px`
  //   })
  // }
})
