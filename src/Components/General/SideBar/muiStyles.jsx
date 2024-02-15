import MuiDrawer from '@mui/material/Drawer'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import { useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'

export const drawerWidth = 240

export const openedMixin = (theme) => ({
  width: drawerWidth,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

export const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  boxShadow: theme.shadows[2],
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

export const DrawerHeader = styled('div')(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  padding: theme.spacing(0, 2.5),
  ...theme.mixins.toolbar
}))

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
    return {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      display: isMobile ? 'none' : 'block',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
      })
    }
  }
)

export const ListItemIconMui = styled(ListItemIcon)(
  ({ theme }) => {
    return {
      minWidth: 0,
      marginRight: theme.spacing(1),
      justifyContent: 'center'
    }
  }
)
export const ListItemButtonMui = styled(ListItemButton)(
  ({ theme }) => {
    return {
      transition: theme.transitions.create('padding', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      minHeight: 38,
      // justifyContent: open ? 'initial' : 'center',
      padding: theme.spacing(0, 2),
      color: theme.palette.text.main
    }
  }
)

export const ListItemTextMui = styled(ListItemText)(
  () => {
    return {
      // opacity: open ? 1 : 0
      // display: open ? 'block' : 'none'
    }
  }
)
