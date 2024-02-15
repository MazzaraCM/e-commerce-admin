import React, { useState } from 'react'
import { useDiscounts } from '../../Hooks/Models/discounts'
import { useMessageHandler } from '../../Hooks/handlerMessages'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useDialogContext } from './context/dialog'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../../Utils/const'

export function DisableDiscountCode ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  const { toastHandler } = useMessageHandler()
  const { DisableDiscount } = useDiscounts()
  const [discountApiState, setDiscountApiState] = useState(REQUEST_STATE_IDLE)

  const { id, code, amount, discount_type, date_start, date_end, status } = data

  const handleDisable = () => {
    setDiscountApiState(REQUEST_STATE_LOADING)
    DisableDiscount({ body: { id, code, amount, discount_type, date_start, date_end, status } })
      .then(() => {
        handleDialog()
        setDiscountApiState(REQUEST_STATE_SUCCESS)
        toastHandler({ message: 'Cupón actualizado con éxito, por favor recarga la página', type: 'success' })
      }).catch(() => setDiscountApiState(REQUEST_STATE_ERROR))
  }

  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>¿Deshabilitar Cupón?</DialogTitle>
      <DialogContent>
        <Typography component='p' fontWeight={400} fontSize={16} fontFamily='Montserrat, sans-serif' marginBottom={1}>
          Estás por deshabilitar el cupón <strong>{code}</strong>.<br /> Su fecha de inicio es <strong>{moment(date_start).format('DD-MM-YYYY')}</strong> y finaliza el <strong>{moment(date_end).format('DD-MM-YYYY')}</strong>.<br /> Actualmente tiene un valor de <strong>{discount_type === 'Percent' ? '%' : '$'} {amount}</strong>.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog}>Cancel</Button>
        <LoadingButton onClick={handleDisable} loading={discountApiState === REQUEST_STATE_LOADING}>Disable</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export function DeleteDiscountCode ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  const { toastHandler } = useMessageHandler()
  const { DeleteDiscount } = useDiscounts()
  const [discountApiState, setDiscountApiState] = useState(REQUEST_STATE_IDLE)

  const { id } = data
  const handleDisable = () => {
    setDiscountApiState(REQUEST_STATE_LOADING)
    DeleteDiscount({ body: { id } })
      .then(() => {
        handleDialog()
        setDiscountApiState(REQUEST_STATE_SUCCESS)
        toastHandler({ message: 'Cupón eliminado con éxito, por favor recarga la página', type: 'success' })
      }).catch(() => setDiscountApiState(REQUEST_STATE_ERROR))
  }

  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>¿Eliminar Cupón?</DialogTitle>
      <DialogContent>
        <Typography component='p' fontWeight={400} fontSize={16} fontFamily='Montserrat, sans-serif' marginBottom={1}>
          Estás por eliminar el cupón <strong>{data.code}</strong>.<br /> Su fecha de inicio es <strong>{moment(data.date_start).format('DD-MM-YYYY')}</strong> y finaliza el <strong>{moment(data.date_end).format('DD-MM-YYYY')}</strong>.<br /> Actualmente tiene un valor de <strong>{data.discount_type === 'Percent' ? '%' : '$'} {data.amount}</strong>.<br /> Una vez eliminado no se puede recuperar
        </Typography>
      </DialogContent>
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
