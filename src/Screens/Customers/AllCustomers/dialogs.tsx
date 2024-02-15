import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { useDialogContext } from './context/dialog'

function TextFieldBox ({ children }) {
  return (
    <Box component='div' sx={{ '& > :not(style)': { m: 1 }, justifyContent: 'center', display: 'flex' }}>
      {children}
    </Box>
  )
}

export function ChangeCreditCard ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>¿Habilitar edición de tarjeta de crédito?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esto habilita la posibilidad de que <strong>{data.name}</strong> con su tienda <strong>{data.store_name}</strong> pueda cambiar su tarjeta de crédito.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog}>Cancelar</Button>
        <Button onClick={handleDialog}>Habilitar</Button>
      </DialogActions>
    </Dialog>
  )
}

export function EditCreditCard ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>Tarjeta de Crédito</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Estás editando la dirección de Paypal de <strong>{data.name}</strong> y de su tienda <strong>{data.store_name}</strong>.
          Coloca la nueva dirección a continuación:
        </DialogContentText>
        <Box component='form' autoComplete='off'>
          <TextFieldBox>
            <TextField autoFocus id='name' label='Name' type='text' variant='outlined' fullWidth />
            <TextField autoFocus id='number' label='Number' type='number' variant='outlined' fullWidth />
          </TextFieldBox>
          <TextFieldBox>
            <TextField autoFocus id='expirationDate' label='Expiration Date' type='text' variant='outlined' fullWidth />
            <TextField autoFocus id='code' label='Code' type='number' variant='outlined' fullWidth />
            <TextField autoFocus id='zipCode' label='Zip Code' type='text' variant='outlined' fullWidth />
          </TextFieldBox>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog}>Cancel</Button>
        <Button onClick={handleDialog}>Update</Button>
      </DialogActions>
    </Dialog>
  )
}

export function EditPaypalEmail ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>¿Cambiar correo de Paypal?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Estás editando la dirección de Paypal de <strong>{data.name}</strong> y de su tienda <strong>{data.store_name}</strong>.
          Coloca la nueva dirección a continuación:
        </DialogContentText>
        <Box component='form' autoComplete='off'>
          <TextFieldBox>
            <TextField autoFocus id='email' label='Email Address' type='email' variant='outlined' fullWidth />
          </TextFieldBox>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog}>Cancel</Button>
        <Button onClick={handleDialog}>Update</Button>
      </DialogActions>
    </Dialog>
  )
}

export function ChangeStoreName ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>¿Cambiar nombre de la tienda?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Estás editando el nombre de la tienda de <strong>{data.name}</strong>. Su nombre actual es <strong>{data.store_name}</strong>.
          Coloca el nuevo nombre a continuación:
        </DialogContentText>
        <Box component='form' autoComplete='off'>
          <TextFieldBox>
            <TextField autoFocus id='name' label='Store Name' type='text' variant='outlined' fullWidth />
          </TextFieldBox>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog}>Cancel</Button>
        <Button onClick={handleDialog}>Update</Button>
      </DialogActions>
    </Dialog>
  )
}

export function DisableStore ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>¿Deshabilitar Tienda?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Estás por deshabilitar la tienda de <strong>{data.name}</strong>.<br /> Su nombre actual es <strong>{data.store_name}</strong>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog}>Cancel</Button>
        <Button onClick={handleDialog}>Disable Store</Button>
      </DialogActions>
    </Dialog>
  )
}

export function DeleteStore ({ data }) {
  const { openDialog, handleDialog } = useDialogContext()
  return (
    <Dialog open={openDialog} onClose={handleDialog}>
      <DialogTitle>¿Eliminar Tienda?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Estás por eliminar la tienda de <strong>{data.name}</strong>.<br /> Su nombre actual es <strong>{data.store_name}</strong>.<br />
          Una vez eliminada no se puede recuperar.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialog}>Cancel</Button>
        <Button onClick={handleDialog}>Delete Store</Button>
      </DialogActions>
    </Dialog>
  )
}

export function Dialogs () {
  const { Dialog } = useDialogContext()

  return <>{Dialog}</>
}
