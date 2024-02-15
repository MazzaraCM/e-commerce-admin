import React, { useState, useEffect } from 'react'
import { DialogProvider } from './context/dialog'
import { FormProvider, useFormContext } from './context/form'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { InputsBox } from '../../../Components/Common/inputsBox/inputsBox'
import { InputBasic } from '../../../Components/Common/inputBasic/inputBasic'
import { BoxShadowHeader } from '../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { useMessageHandler } from '../../../Hooks/handlerMessages'
import { useGeneralSettings } from '../../../Hooks/Models/generalSettings'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../../../Utils/const'
import { SettingsColumns, SettingsColumnsNotVisible } from './TableColumns'
import { Dialogs } from './dialogs'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

const FormSettings = ({ apiRequestState, onSuccess, settingsData }) => {
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
        <InputBasic label='Fixed Charge for Storefronts' value={settingsData.data.fixed_storefront_charge} name='language' type='text' sublabel='El nombre de tu cupón, puede contener letras y números' fullWidth required />
        <InputBasic label='Minimum Sales Amount' value={settingsData.data.minimum_sales_amount} name='country' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
        <InputBasic label='Maximum Discount On Coupons' value={settingsData.data.max_discount_code} name='name' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
        <InputBasic label='Shipping Cost: Product Change' value={settingsData.data.shipping_cost_product_change} name='code' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
        <InputBasic label='Shipping Cost: Sale' value={settingsData.data.shipping_cost_sale} name='code' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
      </InputsBox>
      <Box sx={{ justifyContent: 'end', display: 'flex', marginTop: 1 }}>
        <Stack spacing={2} direction='row'>
          <Button variant='outlined' size='small' onClick={clearFormData} disabled={(apiRequestState === REQUEST_STATE_SUCCESS) && (discountApiState !== REQUEST_STATE_LOADING)}>Limpiar</Button>
          <LoadingButton variant='outlined' size='small' color='success' type='submit' loading={discountApiState === REQUEST_STATE_LOADING} disabled={!isValidForm && (apiRequestState === REQUEST_STATE_SUCCESS)}>Actualizar</LoadingButton>
        </Stack>
      </Box>
    </Box>
  )
}
const FormCommissions = ({ apiRequestState, onSuccess, settingsData }) => {
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
        <InputBasic label='Name' name='language' type='text' sublabel='El nombre de tu cupón, puede contener letras y números' fullWidth required />
        <InputBasic label='Description' name='country' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
        <InputBasic label='Commission Percentage' name='name' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
        <InputBasic label='Referral Commission Percentage' name='code' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
        <InputBasic label='Limit Sales' name='code' type='text' sublabel='El porcentaje que tendrá tu cupón, puede ser máximo de' fullWidth required />
      </InputsBox>
      <Box sx={{ justifyContent: 'end', display: 'flex', marginTop: 1 }}>
        <Stack spacing={2} direction='row'>
          <Button variant='outlined' size='small' onClick={clearFormData} disabled={(apiRequestState === REQUEST_STATE_SUCCESS) && (discountApiState !== REQUEST_STATE_LOADING)}>Limpiar</Button>
          <LoadingButton variant='outlined' size='small' color='success' type='submit' loading={discountApiState === REQUEST_STATE_LOADING} disabled={!isValidForm && (apiRequestState === REQUEST_STATE_SUCCESS)}>Crear</LoadingButton>
        </Stack>
      </Box>
    </Box>
  )
}

export default function GeneralSettingsRegister () {
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { GetSettings } = useGeneralSettings()
  const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [settingsList, setSettingsList] = useState([])
  const [rows, setRows] = useState([{}])
  const initPageSize = 25

  useEffect(() => {
    handleGetSettings()
  }, [])

  function handleGetSettings () {
    setApiRequestState(REQUEST_STATE_LOADING)
    GetSettings()
      .then((result) => {
        setSettingsList(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    if (settingsList?.data?.commission_scale) {
      const formattingResult = columnsAndRowsFormatting({ columns: SettingsColumns, rows: settingsList.data.commission_scale, identifier: 'index' })
      const { formattedRows } = formattingResult
      setRows(formattedRows)
      console.log(settingsList?.data?.commission_scale)
    }
  }, [settingsList])

  const handleSelectionChange = (selectedRowsIds) => {
    const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
    console.log(selectedRows)
  }

  return (
    <Main>
      <FormProvider>
        <ComponentWatcher requestState={apiRequestState}>
          {{
            ComponentWatcherSuccess: (
              <>
                <BoxShadow sx={{ marginBottom: 2 }}>
                  <BoxShadowHeader title='General Settings' subtitle='Crea un lenguaje o selecciona uno para ver su información' />
                  <FormSettings settingsData={settingsList} apiRequestState={apiRequestState} onSuccess={handleGetSettings} />
                </BoxShadow>
                <BoxShadow sx={{ marginBottom: 2 }}>
                  <BoxShadowHeader title='Commissions' subtitle='Crea un lenguaje o selecciona uno para ver su información' />
                  <FormCommissions settingsData={settingsList} apiRequestState={apiRequestState} onSuccess={handleGetSettings} />
                </BoxShadow>
                <BoxShadow>
                  <DialogProvider>
                    <Dialogs />
                    <DataGridTable
                      title='List Commission Scale'
                      subtitle='Tabla que muestra tus descuentos'
                      columns={SettingsColumns}
                      rows={rows}
                      onSelectionChange={(selection) => handleSelectionChange(selection)}
                      initPageSize={initPageSize}
                      columnsNotVisible={SettingsColumnsNotVisible}
                      sortModel={[{ field: 'date_created', sort: 'desc' }]}
                    />
                  </DialogProvider>
                </BoxShadow>
              </>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetSettings()} />
          }}
        </ComponentWatcher>
      </FormProvider>
    </Main>
  )
}
