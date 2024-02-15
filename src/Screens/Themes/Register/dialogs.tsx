import React, { useState } from 'react'
import { useMessageHandler } from '../../../Hooks/handlerMessages'
import { useDialogContext } from './context/dialog'
import { useThemes } from '../../../Hooks/Models/themes'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../../../Utils/const'

import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'

export function DisableTheme ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  const { toastHandler } = useMessageHandler()
  const { DisableTheme } = useThemes()
  const [discountApiState, setDiscountApiState] = useState(REQUEST_STATE_IDLE)

  const { id, status } = data

  const handleDisable = () => {
    setDiscountApiState(REQUEST_STATE_LOADING)
    DisableTheme({ body: { id, status } })
      .then(() => {
        handleDialog()
        setDiscountApiState(REQUEST_STATE_SUCCESS)
        toastHandler({ message: 'Tema actualizado con éxito, por favor recarga la página', type: 'success' })
      }).catch(() => setDiscountApiState(REQUEST_STATE_ERROR))
  }

  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>¿Deshabilitar Tema?</DialogTitle>
      <DialogActions>
        <Button onClick={handleDialog}>Cancel</Button>
        <LoadingButton onClick={handleDisable} loading={discountApiState === REQUEST_STATE_LOADING}>Disable</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export function DeleteTheme ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  const { toastHandler } = useMessageHandler()
  const { DeleteTheme } = useThemes()
  const [discountApiState, setDiscountApiState] = useState(REQUEST_STATE_IDLE)

  const { id } = data
  const handleDisable = () => {
    setDiscountApiState(REQUEST_STATE_LOADING)
    DeleteTheme({ body: { id } })
      .then(() => {
        handleDialog()
        setDiscountApiState(REQUEST_STATE_SUCCESS)
        toastHandler({ message: 'Tema eliminado con éxito, por favor recarga la página', type: 'success' })
      }).catch(() => setDiscountApiState(REQUEST_STATE_ERROR))
  }

  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>¿Eliminar Tema?</DialogTitle>
      <DialogActions>
        <Button onClick={handleDialog}>Cancel</Button>
        <LoadingButton onClick={handleDisable} loading={discountApiState === REQUEST_STATE_LOADING}>Delete</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export function Dialogs () {
  const { Dialog } = useDialogContext()

  return <>{Dialog}</>
}
