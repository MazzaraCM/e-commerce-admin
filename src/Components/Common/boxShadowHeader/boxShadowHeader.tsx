import React, { ReactNode } from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material'

export function BoxShadowHeader ({ title, subtitle, iconTitle = <></>, sx } : {title: string, subtitle: string, iconTitle?: ReactNode, sx?: SxProps<Theme>}) {
  return (
    <Stack sx={sx}>
      <Typography variant='h6' fontWeight={600} fontSize={18} fontFamily='Montserrat, sans-serif'>
        {title}
        {iconTitle}
      </Typography>
      <Typography component='p' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginBottom={1}>
        {subtitle}
      </Typography>
    </Stack>
  )
}
