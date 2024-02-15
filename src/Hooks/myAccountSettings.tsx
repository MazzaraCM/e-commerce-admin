import React, { useState, useEffect } from 'react'
import { useUser } from './Models/user'
import { userAuth } from './Models/userAuth'
import { useMessageHandler } from './handlerMessages'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../Utils/const'
import { deepEqual } from '../Utils/utils'
import { useNavigate } from 'react-router-dom'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

const useMyAccountSettings = (data) => {
  const navigate = useNavigate()
  const { UpdateUser } = useUser()
  const { checkAuthToken } = userAuth()
  const { toastHandler } = useMessageHandler()
  const [originalData, setOriginalData] = useState({ ...data })
  const [editedData, setEditedData] = useState({ ...originalData })
  const [hasChanges, setHasChanges] = useState(false)
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_IDLE)

  useEffect(() => {
    setOriginalData({ ...data })
  }, [data])

  const changedFields = Object.keys(editedData).reduce((result, key) => {
    if (!deepEqual(originalData[key], editedData[key])) {
      result[key] = editedData[key]
    }
    return result
  }, {})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedData((prevData) => {
      const propertyPath = name.split('.')
      const newData = JSON.parse(JSON.stringify(prevData))

      let currentLevel = newData
      for (let i = 0; i < propertyPath.length - 1; i++) {
        currentLevel = currentLevel[propertyPath[i]] = { ...currentLevel[propertyPath[i]] }
      }

      currentLevel[propertyPath[propertyPath.length - 1]] = value

      return newData
    })
  }

  const handleValueChange = ({ name, value }: {name: string, value: string}) => {
    setEditedData((prevData) => {
      const propertyPath = name.split('.')
      const newData = JSON.parse(JSON.stringify(prevData))

      let currentLevel = newData
      for (let i = 0; i < propertyPath.length - 1; i++) {
        currentLevel = currentLevel[propertyPath[i]] = { ...currentLevel[propertyPath[i]] }
      }

      currentLevel[propertyPath[propertyPath.length - 1]] = value

      return newData
    })
  }

  const goBack = () => {
    navigate(-1)
  }

  const handleCancelChanges = () => {
    setEditedData({ ...originalData })
    setHasChanges(false)
    goBack()
  }

  const successApi = ({ message }) => {
    checkAuthToken()
    setHasChanges(false)
    setApiRequestState(REQUEST_STATE_SUCCESS)
    toastHandler({ message, type: 'success' })
  }

  const errorApi = ({ message }) => {
    toastHandler({ message, type: 'error' })
    setApiRequestState(REQUEST_STATE_ERROR)
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    setApiRequestState(REQUEST_STATE_LOADING)

    UpdateUser({ body: editedData })
      .then(() => {
        successApi({ message: 'Actualizado con éxito' })
      })
      .catch(() => errorApi({ message: 'Ha ocurrido un error' }))
  }

  const Buttons = () => {
    return (
      <Stack spacing={2} direction='row' justifyContent='end'>
        <Button variant='text' onClick={handleCancelChanges}>Cancelar</Button>
        <LoadingButton variant='contained' type='submit' loading={apiRequestState === REQUEST_STATE_LOADING} disabled={!hasChanges}>Guardar</LoadingButton>
      </Stack>
    )
  }

  useEffect(() => {
    const hasChanges = Object.keys(changedFields).length > 0
    setHasChanges(hasChanges)
    // console.log('originalData', originalData)
    // console.log('editedData', editedData)
    // console.log('hasChanges', hasChanges)
    // console.log('changedFields', changedFields)
  }, [editedData, originalData])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return {
    editedData,
    hasChanges,
    apiRequestState,
    handleInputChange,
    handleValueChange,
    handleCancelChanges,
    handleSubmit,
    Buttons
  }
}

export default useMyAccountSettings
