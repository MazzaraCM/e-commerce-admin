import React, { useState, useEffect } from 'react'
import { DialogProvider } from './context/dialog'
import { FormProvider, useFormContext } from './context/form'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { InputsBox } from '../../../Components/Common/inputsBox/inputsBox'
import { BoxShadowHeader } from '../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { useThemes } from '../../../Hooks/Models/themes'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { useMessageHandler } from '../../../Hooks/handlerMessages'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../../../Utils/const'
import { Columns, ColumnsNotVisible } from './TableColumns'
import { Dialogs } from './dialogs'
import { ColorPickerInput } from '../../../Components/Common/colorPickerInput/colorPickerInput'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

const Form = ({ onSuccess }) => {
  const { CreateTheme, UpdateTheme } = useThemes()
  const { editData, editing, setEditing, setEditData } = useFormContext()
  const { toastHandler } = useMessageHandler()
  const [themeApiState, setThemeApiState] = useState(REQUEST_STATE_IDLE)

  const [themeTitle, setThemeTitle] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#90caf9')
  const [secondaryColor, setSecondaryColor] = useState('#ce93d8')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [successColor, setSuccessColor] = useState('#66bb6a')
  const [errorColor, setErrorColor] = useState('#f44336')

  const handleColorChange = (color, setColor) => {
    setColor(color)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setThemeApiState(REQUEST_STATE_LOADING)

    const successApi = ({ message }) => {
      clearFormData()
      onSuccess()
      setThemeApiState(REQUEST_STATE_SUCCESS)
      toastHandler({ message, type: 'success' })
    }

    const body = {
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      background_color: backgroundColor,
      success_color: successColor,
      error_color: errorColor
    }

    if (editing) {
      const patchBody = { ...body, id: editData.id }
      UpdateTheme({ body: patchBody })
        .then(() => {
          successApi({ message: 'Tema actualizado con éxito' })
        })
        .catch(() => setThemeApiState(REQUEST_STATE_ERROR))
    } else {
      CreateTheme({ body })
        .then(() => {
          successApi({ message: 'Tema creado con éxito' })
        })
        .catch(() => setThemeApiState(REQUEST_STATE_ERROR))
    }
  }

  const clearFormData = () => {
    setThemeTitle('')
    setPrimaryColor('#90caf9')
    setSecondaryColor('#ce93d8')
    setBackgroundColor('#ffffff')
    setSuccessColor('#66bb6a')
    setErrorColor('#f44336')
    if (editing) {
      setEditing(false)
      setEditData(undefined)
    }
  }

  useEffect(() => {
    if (editing) {
      setThemeTitle(editData.title)
      setPrimaryColor(editData.primary_color)
      setSecondaryColor(editData.secondary_color)
      setBackgroundColor(editData.background_color)
      setSuccessColor(editData.success_color)
      setErrorColor(editData.error_color)
    } else {
      clearFormData()
    }
  }, [editing, editData])

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <InputsBox columns={3}>
        <ColorPickerInput label='Primary Color' value={primaryColor} onChange={(color) => handleColorChange(color, setPrimaryColor)} />
        <ColorPickerInput label='Secondary Color' value={secondaryColor} onChange={(color) => handleColorChange(color, setSecondaryColor)} />
        <ColorPickerInput label='Background Color' value={backgroundColor} onChange={(color) => handleColorChange(color, setBackgroundColor)} />
        <ColorPickerInput label='Success Color' value={successColor} onChange={(color) => handleColorChange(color, setSuccessColor)} />
        <ColorPickerInput label='Error Color' value={errorColor} onChange={(color) => handleColorChange(color, setErrorColor)} />
      </InputsBox>
      {editing && (
        <Typography component='h6' fontWeight={400} fontSize={18} fontFamily='Montserrat, sans-serif' textAlign='center'>
          Editando {themeTitle}
        </Typography>
      )}
      <Box sx={{ justifyContent: 'end', display: 'flex', marginTop: 1 }}>
        <Stack spacing={2} direction='row'>
          {editing && (
            <Button variant='outlined' size='small' onClick={clearFormData}>Cancelar</Button>
          )}
          <LoadingButton variant='outlined' size='small' color='success' type='submit' loading={themeApiState === REQUEST_STATE_LOADING}>{editing ? 'Actualizar' : 'Crear'}</LoadingButton>
        </Stack>
      </Box>
    </Box>
  )
}

export default function StoreThemesRegister () {
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { ListThemes } = useThemes()
  const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [themesList, setThemesList] = useState([])
  const [rows, setRows] = useState([{}])
  const initPageSize = 25

  useEffect(() => {
    handleGetThemes()
  }, [])

  function handleGetThemes () {
    setApiRequestState(REQUEST_STATE_LOADING)
    ListThemes()
      .then((result) => {
        setThemesList(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: Columns, rows: themesList, identifier: '_id' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [themesList])

  const handleSelectionChange = (selectedRowsIds) => {
    const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
    console.log(selectedRows)
  }

  return (
    <Main>
      <FormProvider>
        <BoxShadow sx={{ marginBottom: 2 }}>
          <BoxShadowHeader title='Themes List' subtitle='Crea un tema o selecciona uno para editarlo o ver su información' />
          <Form onSuccess={handleGetThemes} />
        </BoxShadow>
        <ComponentWatcher requestState={apiRequestState}>
          {{
            ComponentWatcherSuccess: (
              <BoxShadow>
                <DialogProvider>
                  <Dialogs />
                  <DataGridTable
                    title='Themes'
                    subtitle='Tabla que muestra todos los temas'
                    columns={Columns}
                    rows={rows}
                    onSelectionChange={(selection) => handleSelectionChange(selection)}
                    initPageSize={initPageSize}
                    columnsNotVisible={ColumnsNotVisible}
                    sortModel={[{ field: 'date_created', sort: 'desc' }]}
                  />
                </DialogProvider>
              </BoxShadow>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetThemes()} />
          }}
        </ComponentWatcher>
      </FormProvider>
    </Main>
  )
}
