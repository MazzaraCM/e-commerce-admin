import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'

export function StoreColorDots ({ theme, justifyContent = 'start' }) {
  if (!theme) {
    return null
  }
  const primaryColor = theme.primary_color
  const secondaryColor = theme.secondary_color
  const backgroundColor = theme.background_color
  const textColor = theme.text_color
  return (
    <AvatarGroup max={4} sx={{ justifyContent }}>
      <Avatar sx={{ bgcolor: primaryColor, width: 26, height: 26, '.MuiSvgIcon-root': { display: 'none' } }} />
      <Avatar sx={{ bgcolor: secondaryColor, width: 26, height: 26, '.MuiSvgIcon-root': { display: 'none' } }} />
      <Avatar sx={{ bgcolor: backgroundColor, width: 26, height: 26, '.MuiSvgIcon-root': { display: 'none' } }} />
      <Avatar sx={{ bgcolor: textColor, width: 26, height: 26, '.MuiSvgIcon-root': { display: 'none' } }} />
    </AvatarGroup>
  )
}

export function StoreColorDot ({ color, justifyContent = 'start' }) {
  return (
    <AvatarGroup max={4} sx={{ justifyContent }}>
      <Avatar sx={{ bgcolor: color, width: 26, height: 26, '.MuiSvgIcon-root': { display: 'none' } }} />
    </AvatarGroup>
  )
}
