import { useState } from 'react'
import { userAuth } from '../../../Hooks/Models/userAuth'
import { useUserContext } from '../../../Context/user'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import LogoutIcon from '@mui/icons-material/Logout'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import NotListedLocationOutlinedIcon from '@mui/icons-material/NotListedLocationOutlined'
import { Link } from 'react-router-dom'
import { textMain, textStatic } from '../../../Themes/colors'
import './style.css'

const StyledMenu = styled((props) => (
  <Menu
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
    minWidth: 180,
    width: 280,
    maxWidth: '100%'
  }
}))

function AccountMenuButtons ({ userData, anchorEl, open, handleClose, logout }) {
  return (
    <StyledMenu anchorEl={anchorEl} id='account-menu' open={open} onClose={handleClose} onClick={handleClose}>
      <MenuItem className='accountName' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
        <Avatar className='avatar'>{userData.first_name[0]}</Avatar>
        <Box className='accountName' sx={{ display: { xs: 'none', sm: 'flex', flexDirection: 'column', alignItems: 'start' }, marginLeft: 1 }}>
          <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif' style={{ color: textStatic() }}>
            {userData.first_name} {userData.last_name}
          </Typography>
          <Typography variant='h6' fontWeight={400} fontSize={10} fontFamily='Montserrat, sans-serif' style={{ color: textStatic() }}>
            {userData.store ? userData.store.subdomain : userData.role.name}
          </Typography>
        </Box>
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <Link to='/users/my-account' style={{ color: textMain() }} onClick={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <PersonOutlinedIcon fontSize='small' />
          </ListItemIcon>
          Profile
        </MenuItem>
      </Link>
      {userData.store?.subdomain && (
        <Link onClick={() => window.open(`https://${userData.store?.subdomain}.admin.com`, '_blank', 'noreferrer')} style={{ color: textMain() }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <StorefrontOutlinedIcon fontSize='small' />
            </ListItemIcon>
            Store
          </MenuItem>
        </Link>
      )}
      <MenuItem onClick={logout()} style={{ color: textMain() }}>
        <ListItemIcon>
          <LogoutIcon fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem style={{ color: textMain() }}>
        <ListItemIcon>
          <NotListedLocationOutlinedIcon fontSize='small' />
        </ListItemIcon>
        Ayuda
      </MenuItem>
    </StyledMenu>
  )
}

export function AccountMenuAvatar () {
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useUserContext()
  const { logout } = userAuth()
  const open = Boolean(anchorEl)
  const userData = user?.user

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // if (userData) {
  return (
    <>
      <Box className='account-box' onClick={handleClick}>
        <Tooltip title='Account settings'>
          <IconButton className='iconButton' size='small' aria-controls={open ? 'account-menu' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
            <Avatar className='avatar'>{userData?.first_name[0]}</Avatar>
            <Box className='accountName' sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif' style={{ color: textMain() }}>
                {userData?.first_name} {userData?.last_name}
              </Typography>
              <Typography variant='h6' fontWeight={400} fontSize={10} fontFamily='Montserrat, sans-serif' style={{ color: textMain() }}>
                {userData?.role.name}
              </Typography>
            </Box>
          </IconButton>
        </Tooltip>
      </Box>
      {userData && (
        <AccountMenuButtons anchorEl={anchorEl} handleClose={handleClose} open={open} userData={userData} logout={logout} />
      )}
    </>
  )
  // } else {
  //   return (
  //     <Box className='account-box'>
  //       <Skeleton animation='wave' variant='circular'>
  //         <Avatar className='avatar' />
  //       </Skeleton>
  //       <Box className='accountName' sx={{ display: { xs: 'none', sm: 'flex' } }}>
  //         <Skeleton animation='wave'>
  //           <Typography variant='h6' fontWeight={400} fontSize={14}>
  //             Loading...
  //           </Typography>
  //         </Skeleton>
  //       </Box>
  //     </Box>
  //   )
  // }
}
