import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

export const BoxStyled = styled(Box)(({ theme }) => ({
  // boxShadow: theme.shadows[2],
  // border: '1px solid #e1e3e1',
  border: theme.borders.main,
  borderRadius: '10px',
  padding: theme.spacing(2, 4),
  maxWidth: '1024px',
  margin: 'auto',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.main
}))
