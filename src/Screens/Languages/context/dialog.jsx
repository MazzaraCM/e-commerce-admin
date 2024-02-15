import { useState, useContext, createContext } from 'react'

const DialogContext = createContext()

export const useDialogContext = () => {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }

  return context
}

export const DialogProvider = ({ children }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [Dialog, setDialog] = useState(<></>)

  const handleDialog = () => {
    setOpenDialog((state) => !state)
  }
  const setDialogComponent = (newDialog) => {
    setDialog(newDialog)
  }

  const value = {
    openDialog,
    handleDialog,
    Dialog,
    setDialogComponent,
    setOpenDialog
  }

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}
