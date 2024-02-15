import Box from '@mui/material/Box'

export function BoxShadowContent ({ children, ...props }) {
  return (
    <Box sx={{ padding: '16px 32px' }} {...props}>
      {children}
    </Box>
  )
}
