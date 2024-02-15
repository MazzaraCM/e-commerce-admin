import { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { ListItemButtonMui, ListItemIconMui, ListItemTextMui } from './muiStyles'
import { backgroundOpacity, textStatic } from '../../../Themes/colors'
import { useSidebarContext } from '../../../Context/sidebar'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MailIcon from '@mui/icons-material/Mail'
import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'

import Collapse from '@mui/material/Collapse'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export function SidebarItemsSkeleton ({ openSidebar, numberOfItems }) {
  const skeletons = []

  for (let index = 0; index < numberOfItems; index++) {
    skeletons.push(
      <ListItem key={index} disablePadding sx={{ display: 'block' }}>
        <ListItemButtonMui open={openSidebar}>
          <ListItemIconMui open={openSidebar}>
            <Skeleton variant='rounded'>
              <MailIcon />
            </Skeleton>
          </ListItemIconMui>
        </ListItemButtonMui>
      </ListItem>
    )
  }
  return skeletons
}

export function renderMenuItem ({ menuItem, openSidebar }) {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }
  return (
    <Fragment key={menuItem.menu._id}>
      <Link to={menuItem.childs.length > 0 ? '#' : menuItem.menu.url} style={{ textDecoration: 'none' }}>
        <ListItemButtonMui open={openSidebar} onClick={handleChange}>
          <ListItemIconMui open={openSidebar} sx={{ width: '30px' }}>
            <Icon className={menuItem.menu.icon} sx={{ width: '100%', fontSize: 20, color: textStatic() }} />
          </ListItemIconMui>
          <ListItemTextMui primary={menuItemText(menuItem.menu.name)} open={openSidebar} />
          {menuItem.childs.length > 0 && openSidebar && (
            checked ? <ExpandLessIcon /> : <ExpandMoreIcon />
          )}
        </ListItemButtonMui>
      </Link>
      {menuItem.childs.length > 0 && (
        <Collapse orientation='vertical' in={checked}>
          <List>
            {menuItem.childs.map((childMenu) => (
              <Link to={childMenu.menu.url} key={childMenu.menu._id} style={{ textDecoration: 'none' }}>
                <ListItemButtonMui sx={{ pl: openSidebar ? 4 : 2 }} open={openSidebar}>
                  <ListItemIconMui sx={{ width: '30px' }}>
                    <Icon className={childMenu.menu.icon} sx={{ width: '100%', fontSize: 20, color: textStatic() }} />
                  </ListItemIconMui>
                  <ListItemTextMui
                    primary={menuItemText(childMenu.menu.name)} open={openSidebar} sx={{ pl: 1 }}
                  />
                </ListItemButtonMui>
              </Link>
            ))}
          </List>
        </Collapse>
      )}
    </Fragment>
  )
}

export function menuItemText (text) {
  return (
    <Typography variant='h6' fontWeight={500} fontSize={14} noWrap fontFamily='Montserrat, sans-serif'>
      {text}
    </Typography>
  )
}

const HandleMenuItems = ({ menu, openSidebar, openMenus, handleMenuClick }) => {
  const menuArray = []

  for (const item of menu) {
    menuArray.push(renderMenuItem({ menuItem: item, openSidebar, openMenus, handleMenuClick }))
  }

  return menuArray
}

export function DrawerContent ({ menu, apiRequestState, handlerGetMenu, userData }) {
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { handleSidebar, openSidebar, openByHover, setOpenByHover } = useSidebarContext()

  const [openMenus, setOpenMenus] = useState([])

  const handleMenuClick = (menuId) => {
    setOpenMenus((prevOpenMenus) => {
      const isOpen = prevOpenMenus.includes(menuId)
      return isOpen
        ? prevOpenMenus.filter((id) => id !== menuId)
        : [...prevOpenMenus, menuId]
    })
  }

  const hoverTimeoutRef = useRef(null)

  const handleMouseEnter = () => {
    if (!openSidebar) {
      hoverTimeoutRef.current = setTimeout(() => {
        handleSidebar()
        setOpenByHover(true)
      }, 50)
    }
  }

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current)

    if (openSidebar && openByHover) {
      handleSidebar()
      setOpenByHover(false)
    }
  }

  return (
    <List
      style={{ backgroundColor: backgroundOpacity(), height: '100%', borderRight: 0 }} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ComponentWatcher requestState={apiRequestState}>{{
        ComponentWatcherSuccess: menu && (
          <HandleMenuItems menu={menu} openSidebar={openSidebar} openMenus={openMenus} handleMenuClick={handleMenuClick} />
        ),
        ComponentWatcherLoading: SidebarItemsSkeleton({ openSidebar, numberOfItems: 8 }),
        ComponentWatcherError: <ButtonRetry onClick={() => handlerGetMenu({ userId: userData._id })} />
      }}
      </ComponentWatcher>
    </List>
  )
}
