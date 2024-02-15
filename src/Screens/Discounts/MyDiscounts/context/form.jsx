import { useState, useContext, createContext } from 'react'

const FormContext = createContext()

export const useFormContext = () => {
  const context = useContext(FormContext)

  if (!context) {
    throw new Error('useForm must be used within a FormProvider')
  }

  return context
}

export const FormProvider = ({ children }) => {
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState(undefined)
  const value = {
    editing,
    setEditing,
    editData,
    setEditData
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}
