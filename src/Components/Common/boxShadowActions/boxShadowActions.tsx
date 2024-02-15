import React, { MouseEventHandler, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

export function BoxShadowActions ({ children, firstButtonValue, firstButtonOnClick } : {children?: ReactNode, firstButtonValue: ReactNode, firstButtonOnClick: MouseEventHandler<HTMLButtonElement> }) {
  return (
    <Box sx={{
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}
    >
      <Divider />
      <Box sx={{ justifyContent: 'left', display: 'flex' }}>
        {children}
        <Button size='small' sx={{ width: '100%', paddingY: 2, paddingX: 4, justifyContent: 'left' }} onClick={firstButtonOnClick}>{firstButtonValue}</Button>
      </Box>
    </Box>
  )
}
