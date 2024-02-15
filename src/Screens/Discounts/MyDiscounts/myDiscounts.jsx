import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { DialogProvider } from './context/dialog'
import { FormProvider, useFormContext } from './context/form'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { InputsBox } from '../../../Components/Common/inputsBox/inputsBox'
import { InputBasic } from '../../../Components/Common/inputBasic/inputBasic'
import { BoxShadowHeader } from '../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { DateCalendarBasic } from '../../../Components/Common/dateCalendarBasic/DateCalendarBasic'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { useDiscounts } from '../../../Hooks/Models/discounts'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { useMessageHandler } from '../../../Hooks/handlerMessages'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../../../Utils/const'
import { MyDiscountsColumns, MyDiscountsColumnsNotVisible } from './TableColumns'
import { Dialogs } from './dialogs'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

const Form = ({ maxDiscountCode, apiRequestState, onSuccess }) => {
  const { CreateDiscount, UpdateDiscount } = useDiscounts()
  const { editData, editing, setEditing, setEditData } = useFormContext()
  const { toastHandler } = useMessageHandler()
  const [discountApiState, setDiscountApiState] = useState(REQUEST_STATE_IDLE)
  const [isDataForm, setIsDataForm] = useState(false)
  const [isValidForm, setIsValidForm] = useState(false)
  const [discountName, setDiscountName] = useState('')
  const [discountValue, setDiscountValue] = useState('')
  const [expiryStart, setExpiryStart] = useState('')
  const [expiryEnd, setExpiryEnd] = useState('')

  const handleDiscount = (event) => {
    const input = event.target.name
    const value = event.target.value
    if (input === 'discountName') {
      setDiscountName(value.toUpperCase())
    }
    if (input === 'discountPercentage') {
      if (!isNaN(value)) {
        setDiscountValue(Math.min(Math.max(value, 0), maxDiscountCode))
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setDiscountApiState(REQUEST_STATE_LOADING)

    const successApi = ({ message }) => {
      clearFormData()
      onSuccess()
      setDiscountApiState(REQUEST_STATE_SUCCESS)
      toastHandler({ message, type: 'success' })
    }

    if (editing) {
      UpdateDiscount({ body: { code: discountName, amount: discountValue, discount_type: 'Percent', date_start: expiryStart, date_end: expiryEnd } })
        .then(() => {
          successApi({ message: 'Cupón actualizado con éxito' })
        })
        .catch(() => setDiscountApiState(REQUEST_STATE_ERROR))
    } else {
      CreateDiscount({ body: { code: discountName, amount: discountValue, discount_type: 'Percent', date_start: expiryStart, date_end: expiryEnd } })
        .then(() => {
          successApi({ message: 'Cupón creado con éxito' })
        })
        .catch(() => setDiscountApiState(REQUEST_STATE_ERROR))
    }
  }

  const clearFormData = () => {
    setDiscountName('')
    setDiscountValue('')
    setExpiryStart('')
    setExpiryEnd('')
    setIsDataForm(false)
    if (editing) {
      setEditing(false)
      setEditData(undefined)
    }
  }

  useEffect(() => {
    if (editing) {
      if (editData.discount_type === 'Percent') {
        setDiscountName(editData.code)
        setDiscountValue(parseFloat(editData.amount))
        setExpiryStart(moment(editData.date_start).format('DD-MM-YYYY'))
        setExpiryEnd(moment(editData.date_end).format('DD-MM-YYYY'))
        setIsDataForm(true)
      } else {
        toastHandler({ message: 'Solo puedes editar cupones que sean de tipo "Percent"', type: 'info' })
      }
    } else {
      clearFormData()
    }
  }, [editing, editData])

  useEffect(() => {
    if (discountName || discountValue || expiryStart || expiryEnd) {
      setIsDataForm(true)
    } else {
      setIsDataForm(false)
    }
    if (discountName && discountValue && expiryStart && expiryEnd && (expiryStart < expiryEnd) && (discountValue <= 25) && (discountName.length <= 25) && (expiryEnd > moment().format('DD-MM-YYYY'))) {
      setIsValidForm(true)
    } else {
      setIsValidForm(false)
    }
  }, [discountName, discountValue, expiryStart, expiryEnd])

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
    >
      <InputsBox columns={4}>
        <InputBasic id='discountName' label='Discount Code' name='discountName' type='text' maxLength='25' sublabel='El nombre de tu cupón, puede contener letras y números' helperText={editing ? 'En edición no puedes modificar el nombre' : 'Máximo 25 caracteres'} value={discountName} onChange={handleDiscount} fullWidth required disabled={editing} />
        <InputBasic id='discountPercentage' label='Discount Percentage' name='discountPercentage' type='number' min='0' max={maxDiscountCode} sublabel={`El porcentaje que tendrá tu cupón, puede ser máximo de ${maxDiscountCode}%`} value={discountValue} onChange={handleDiscount} fullWidth required />
        <DateCalendarBasic maxDate={moment(expiryEnd, 'DD-MM-YYYY')} disablePast disableFuture={false} callback={(date) => setExpiryStart(date)} callbackFormat='DD-MM-YYYY' openTo='day' customSelector={<InputBasic id='expiryStart' label='Date Start' value={expiryStart} readOnly name='expiryStart' sublabel='Fecha en la que tu cupón entrará en vigencia' fullWidth required />} />
        <DateCalendarBasic minDate={moment(expiryStart, 'DD-MM-YYYY')} disablePast disableFuture={false} callback={(date) => setExpiryEnd(date)} callbackFormat='DD-MM-YYYY' openTo='day' customSelector={<InputBasic id='expiryEnd' label='Date End' value={expiryEnd} readOnly name='expiryEnd' sublabel='Fecha en la que tu cupón finalizará' fullWidth required />} />
      </InputsBox>
      <Box sx={{ justifyContent: 'end', display: 'flex', marginTop: 1 }}>
        <Stack spacing={2} direction='row'>
          <Button variant='outlined' size='small' onClick={clearFormData} disabled={!isDataForm && (apiRequestState === REQUEST_STATE_SUCCESS) && (discountApiState !== REQUEST_STATE_LOADING)}>{editing ? 'Cancelar' : 'Limpiar'}</Button>
          <LoadingButton variant='outlined' size='small' color='success' type='submit' loading={discountApiState === REQUEST_STATE_LOADING} disabled={!isValidForm && (apiRequestState === REQUEST_STATE_SUCCESS)}>{editing ? 'Actualizar' : 'Crear'}</LoadingButton>
        </Stack>
      </Box>
    </Box>
  )
}

export default function MyDiscounts () {
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { ListMyDiscounts } = useDiscounts()
  const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [discountsList, setDiscountsList] = useState([])
  const [maxDiscountCode, setMaxDiscountCode] = useState(0)
  const [rows, setRows] = useState([{}])
  const initPageSize = 25

  useEffect(() => {
    handleGetDiscounts()
  }, [])

  function handleGetDiscounts () {
    setApiRequestState(REQUEST_STATE_LOADING)
    ListMyDiscounts({})
      .then((result) => {
        setDiscountsList(result.data.discountList)
        setMaxDiscountCode(result.data.max_discount_code)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: MyDiscountsColumns, rows: discountsList, identifier: '_id' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [discountsList])

  const handleSelectionChange = (selectedRowsIds) => {
    const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
    console.log(selectedRows)
  }

  return (
    <Main>
      <FormProvider>
        <BoxShadow sx={{ marginBottom: 2 }}>
          <BoxShadowHeader title='Discount Code' subtitle='Crea un cupón o selecciona un cupón para ver su información' />
          <Form maxDiscountCode={maxDiscountCode} apiRequestState={apiRequestState} onSuccess={handleGetDiscounts} />
        </BoxShadow>
        <ComponentWatcher requestState={apiRequestState}>
          {{
            ComponentWatcherSuccess: (
              <BoxShadow>
                <DialogProvider>
                  <Dialogs />
                  <DataGridTable
                    title='My Discounts'
                    subtitle='Tabla que muestra tus descuentos'
                    columns={MyDiscountsColumns}
                    rows={rows}
                    onSelectionChange={(selection) => handleSelectionChange(selection)}
                    initPageSize={initPageSize}
                    columnsNotVisible={MyDiscountsColumnsNotVisible}
                    sortModel={[{ field: 'date_created', sort: 'desc' }]}
                  />
                </DialogProvider>
              </BoxShadow>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetDiscounts()} />
          }}
        </ComponentWatcher>
      </FormProvider>
    </Main>
  )
}
