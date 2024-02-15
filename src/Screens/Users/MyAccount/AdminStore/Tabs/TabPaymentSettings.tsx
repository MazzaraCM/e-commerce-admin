import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BoxShadow } from '../../../../../Components/Common/boxShadow/boxShadow'
import { BoxShadowHeader } from '../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { BoxShadowContent } from '../../../../../Components/Common/boxShadowContent/boxShadowContent'
import { BoxShadowActions } from '../../../../../Components/Common/boxShadowActions/boxShadowActions'
import { InputsBox } from '../../../../../Components/Common/inputsBox/inputsBox'
import { InformationButton } from '../../../../../Components/Common/informationButton/informationButton'

import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'

export function TabPaymentSettings ({ customerData }) {
  const navigate = useNavigate()
  return (
    <TabPanel value='/users/my-account/payment-settings' sx={{ p: 0 }}>

      <BoxShadow style={{ padding: 0 }}>
        <BoxShadowContent>
          <Typography variant='h6' fontWeight={500} fontSize={18} fontFamily='Montserrat, sans-serif'>
            Métodos de pago
          </Typography>
          <Typography variant='body2' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif'>
            Los métodos de pago se guardan en tu cuenta para que puedas usarlos en distintos servicios.
          </Typography>
        </BoxShadowContent>
        <BoxShadowActions firstButtonValue='Gestionar métodos de pago' firstButtonOnClick={() => navigate('/settings/credit-card')} />
      </BoxShadow>

      <BoxShadow sx={{ marginTop: 2 }}>
        <BoxShadowHeader title='Payment Details' subtitle='Información de pagos' />
        <InputsBox columns={1}>
          <InformationButton label='Paypal Email' href='payment-email' value={customerData.paypal_email} />
          <InformationButton label='W9' href='w9' value={customerData.format_w9 !== '' ? 'Visualiza tu W9' : 'Agrega tu W9'} divider={false} />
        </InputsBox>
      </BoxShadow>
    </TabPanel>
  )
}
