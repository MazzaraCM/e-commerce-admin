import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types'
import MuiDrawer from '@mui/material/Drawer'
import { backgroundOpacity, textStatic } from '../../../Themes/colors'
import { useSidebarContext } from '../../../Context/sidebar'
import { LogoImgByTheme } from '../../../Docs/images/logos'
import { useUserContext } from '../../../Context/user'
import { useMenuContext } from '../../../Context/menu'
import { useMenu } from '../../../Hooks/Models/menu'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../Utils/const'
import { DrawerHeader, Drawer } from './muiStyles'
import { DrawerContent } from './utils'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

export function Sidebar (props) {
  const { getMenu } = useMenu()
  const { user } = useUserContext()
  const { menu } = useMenuContext()
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [userData, setUserData] = useState(REQUEST_STATE_LOADING)

  const { window } = props
  const container = window ? window().document.body : document.body
  const { handleSidebar, openSidebar } = useSidebarContext()
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  useEffect(() => {
    if (user) {
      const { user: userData } = user
      handlerGetMenu({ userId: userData._id })
      setUserData(userData)
    }
  }, [user])

  function handlerGetMenu ({ userId }) {
    setApiRequestState(REQUEST_STATE_LOADING)
    getMenu({ userId }).then(() => {
      setApiRequestState(REQUEST_STATE_SUCCESS)
    }).catch(() => {
      setApiRequestState(REQUEST_STATE_ERROR)
    })
  }

  return (
    <aside>
      <Box sx={{ display: 'flex' }}>
        {!isMobile
          ? (
            <Drawer
              variant='permanent' open={openSidebar}
              sx={{ '.MuiPaper-elevation': { boxShadow: 'none', borderRight: 0 } }}
            >
              <DrawerHeader style={{ backgroundColor: backgroundOpacity() }}>
                <IconButton onClick={handleSidebar} size='large' edge='start' aria-label='menu'>
                  <MenuIcon style={{ color: textStatic() }} />
                </IconButton>
              </DrawerHeader>
              <DrawerContent
                menu={menu} apiRequestState={apiRequestState} handlerGetMenu={handlerGetMenu} userData={userData}
              />
            </Drawer>
            )
          : (
            <MuiDrawer
              container={container}
              variant='temporary'
              open={openSidebar}
              onClose={handleSidebar}
              elevation={0}
              ModalProps={{
                keepMounted: true
              }}
              sx={{ backgroundImage: 'none' }}
            >
              <DrawerHeader style={{ backgroundColor: backgroundOpacity() }}>
                <LogoImgByTheme width='140px' display='inherit' />
              </DrawerHeader>
              <DrawerContent menu={menu} apiRequestState={apiRequestState} openSidebar={openSidebar} handlerGetMenu={handlerGetMenu} userData={userData} handleSidebar={handleSidebar} />
            </MuiDrawer>
            )}
      </Box>
    </aside>
  )
}
Sidebar.propTypes = {
  window: PropTypes.func
}
