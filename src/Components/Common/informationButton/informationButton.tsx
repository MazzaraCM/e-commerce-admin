import React from 'react'
import { textMain } from '../../../Themes/colors'
import { Link, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const StyledButton = styled(Button)(({ theme }) => ({
  border: 'none',
  borderRadius: 0,
  width: '100%',
  minHeight: '60px',
  color: theme.palette.text.main,
  ':hover': { backgroundColor: theme.palette.disabled.background, border: 'inherit' }
}))

const StyledBox = styled(Box)({
  justifyContent: 'space-between', alignItems: 'center', width: '100%', display: 'flex'
})

export function InformationButton ({ label, href = label, value, icon = <ArrowForwardIosIcon />, divider = true, clickeable = true, onClick = () => {} }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (clickeable) {
      navigate(`/settings/${href}`)
    }
    onClick()
  }

  return (
    <Box sx={{ width: '100%', height: 'max-content' }}>
      <StyledButton variant='text' onClick={handleClick}>
        <StyledBox>
          <Grid container alignItems='center'>
            <Grid item xs={4}>
              <Typography variant='h6' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' sx={{ color: textMain(), textAlign: 'left', textTransform: 'capitalize' }}>
                {label}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif' noWrap sx={{ color: textMain(), textAlign: 'left', textTransform: 'none' }}>
                {value}
              </Typography>
            </Grid>
            <Grid item xs={1} display='flex' alignItems='center' justifyContent='end'>
              {icon}
            </Grid>
          </Grid>
        </StyledBox>
      </StyledButton>

      {divider && (
        <Divider />
      )}
    </Box>
  )
}
