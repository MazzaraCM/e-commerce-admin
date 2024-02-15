import React, { useState, useEffect } from 'react'
import { DialogProvider } from './context/dialog'
import { FormProvider, useFormContext } from './context/form'
import { Main } from '../../Components/Common/main/main'
import { DataGridTable } from '../../Components/Common/dataGridTable/dataGridTable'
import { BoxShadow } from '../../Components/Common/boxShadow/boxShadow'
import { InputsBox } from '../../Components/Common/inputsBox/inputsBox'
import { InputBasic } from '../../Components/Common/inputBasic/inputBasic'
import { BoxShadowHeader } from '../../Components/Common/boxShadowHeader/boxShadowHeader'
import { useHandlerWatcher } from '../../Hooks/handlerWatcher'
import { useDataGridTable } from '../../Hooks/dataGridTable'
import { useMessageHandler } from '../../Hooks/handlerMessages'
import { useLanguages } from '../../Hooks/Models/languages'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../../Utils/const'
import { LanguagesColumns, LanguagesColumnsNotVisible } from './TableColumns'
import { Dialogs } from './dialogs'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const Form = ({ apiRequestState, onSuccess }) => {
  const { editing, setEditing, setEditData } = useFormContext()
  const { toastHandler } = useMessageHandler()
  const [discountApiState, setDiscountApiState] = useState(REQUEST_STATE_IDLE)
  const [isDataForm, setIsDataForm] = useState(false)
  const [isValidForm, setIsValidForm] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setDiscountApiState(REQUEST_STATE_LOADING)

    // const successApi = ({ message }) => {
    //   clearFormData()
    //   onSuccess()
    //   setDiscountApiState(REQUEST_STATE_SUCCESS)
    //   toastHandler({ message, type: 'success' })
    // }

    // if (editing) {
    //   UpdateDiscount({ body: { code: discountName, amount: discountValue, discount_type: 'Percent', date_start: expiryStart, date_end: expiryEnd } })
    //     .then(() => {
    //       successApi({ message: 'Cupón actualizado con éxito' })
    //     })
    //     .catch(() => setDiscountApiState(REQUEST_STATE_ERROR))
    // } else {
    //   CreateDiscount({ body: { code: discountName, amount: discountValue, discount_type: 'Percent', date_start: expiryStart, date_end: expiryEnd } })
    //     .then(() => {
    //       successApi({ message: 'Cupón creado con éxito' })
    //     })
    //     .catch(() => setDiscountApiState(REQUEST_STATE_ERROR))
    // }
  }

  const clearFormData = () => {
    setIsDataForm(false)
    if (editing) {
      setEditing(false)
      setEditData(undefined)
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
    >
      <InputsBox columns={4}>
        <InputBasic label='Select Language' name='language' type='text' sublabel='El nombre de tu cupón, puede contener letras y números' fullWidth required />
        <InputBasic label='Country' name='country' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
        <InputBasic label='Name' name='name' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
        <InputBasic label='Code Language' name='code' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
      </InputsBox>
      <FormControlLabel control={<Checkbox name='primary' onChange={() => console.log('')} />} label='Primary' labelPlacement='end' color='primary' />
      <Box sx={{ justifyContent: 'end', display: 'flex', marginTop: 1 }}>
        <Stack spacing={2} direction='row'>
          <Button variant='outlined' size='small' onClick={clearFormData} disabled={(apiRequestState === REQUEST_STATE_SUCCESS) && (discountApiState !== REQUEST_STATE_LOADING)}>Limpiar</Button>
          <LoadingButton variant='outlined' size='small' color='success' type='submit' loading={discountApiState === REQUEST_STATE_LOADING} disabled={!isValidForm && (apiRequestState === REQUEST_STATE_SUCCESS)}>Crear</LoadingButton>
        </Stack>
      </Box>
    </Box>
  )
}

export default function Languages () {
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { GetLanguages } = useLanguages()
  const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [languagesList, setLanguagesList] = useState([])
  const [rows, setRows] = useState([{}])
  const initPageSize = 25

  useEffect(() => {
    handleGetLanguages()
  }, [])

  function handleGetLanguages () {
    setApiRequestState(REQUEST_STATE_LOADING)
    GetLanguages()
      .then((result) => {
        console.log(result)
        setLanguagesList(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: LanguagesColumns, rows: languagesList, identifier: '_id' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [languagesList])

  const handleSelectionChange = (selectedRowsIds) => {
    const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
    console.log(selectedRows)
  }

  return (
    <Main>
      <FormProvider>
        <BoxShadow sx={{ marginBottom: 2 }}>
          <BoxShadowHeader title='Languages' subtitle='Crea un lenguaje o selecciona uno para ver su información' />
          <Form apiRequestState={apiRequestState} onSuccess={handleGetLanguages} />
        </BoxShadow>
        <ComponentWatcher requestState={apiRequestState}>
          {{
            ComponentWatcherSuccess: (
              <BoxShadow>
                <DialogProvider>
                  <Dialogs />
                  <DataGridTable
                    title='Languages List'
                    subtitle='Tabla que muestra tus descuentos'
                    columns={LanguagesColumns}
                    rows={rows}
                    onSelectionChange={(selection) => handleSelectionChange(selection)}
                    initPageSize={initPageSize}
                    columnsNotVisible={LanguagesColumnsNotVisible}
                    sortModel={[{ field: 'date_created', sort: 'desc' }]}
                  />
                </DialogProvider>
              </BoxShadow>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetLanguages()} />
          }}
        </ComponentWatcher>
      </FormProvider>
    </Main>
  )
}
