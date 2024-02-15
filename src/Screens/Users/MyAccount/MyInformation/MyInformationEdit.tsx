import React, { useEffect } from 'react'
import { BoxShadow } from '../../../../Components/Common/boxShadow/boxShadow'
import { Main } from '../../../../Components/Common/main/main'
import { textMain } from '../../../../Themes/colors'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Typography from '@mui/material/Typography'

export default function MyInformationEdit ({ children, label }) {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Main sidebar='false'>
      <BoxShadow style={{ maxWidth: '660px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={goBack} sx={{ color: textMain(), ':hover': { backgroundColor: 'inherit' } }}>
            <ArrowBackIcon />
          </Button>
          <Typography variant='h6' fontWeight={600} fontSize={18} fontFamily='Montserrat, sans-serif' textTransform='capitalize'>
            {label}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        {children}
      </BoxShadow>
    </Main>
  )
}
