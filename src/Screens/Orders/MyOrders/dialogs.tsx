import React from 'react'
import { useDialogContext } from './context/dialog'
import { OrderDetail } from '../../../Components/Common/orderDetail/orderDetail'
import { backgroundMain, backgroundOpacity, textStatic } from '../../../Themes/colors'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

export function OrderDetails ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()

  return (
    <Dialog open={openDialog} onClose={handleDialog} fullScreen>
      <AppBar sx={{ position: 'relative', backgroundColor: backgroundMain(), color: textStatic(), backgroundImage: 'none' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleDialog}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' fontWeight={600} fontSize={18} fontFamily='Montserrat, sans-serif'>
            {data.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ backgroundColor: backgroundOpacity() }}>
        <OrderDetail data={data} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export function Dialogs () {
  const { Dialog } = useDialogContext()

  return <>{Dialog}</>
}
