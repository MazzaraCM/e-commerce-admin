import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BoxShadow } from '../../../../../Components/Common/boxShadow/boxShadow'
import { BoxShadowHeader } from '../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { BoxShadowContent } from '../../../../../Components/Common/boxShadowContent/boxShadowContent'
import { BoxShadowActions } from '../../../../../Components/Common/boxShadowActions/boxShadowActions'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TabPanel from '@mui/lab/TabPanel'

export function TabHome ({ userData, customerData }) {
  const navigate = useNavigate()

  const originalData = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone: customerData?.phone,
    billing_country: customerData?.billing_country,
    billing_city: customerData?.billing_city,
    billing_state: customerData?.billing_state,
    billing_zipcode: customerData?.billing_zipcode,
    billing_address: customerData?.billing_address,
    billing_address2: customerData?.billing_address2 !== 'null' ? customerData?.billing_address2 : '',
    creditCard: customerData?.credit_card?.code,
    w9: customerData?.format_w9
  }

  return (
    <TabPanel value='/users/my-account' sx={{ p: 0 }}>
      <BoxShadow>
        <BoxShadowHeader title={`Bienvenido, ${originalData.first_name} ${originalData.last_name}`} subtitle='Gestiona tu información, tu tienda y tu privacidad.' sx={{ textAlign: 'center' }} />
      </BoxShadow>
      <Grid container sx={{ maxWidth: '1024px', margin: 'auto' }}>
        <Grid item xs={12} md={6} marginTop={2} paddingRight={1}>
          <BoxShadow style={{ padding: 0, height: '100%' }}>
            <BoxShadowContent>
              <Typography variant='h6' fontWeight={500} fontSize={18} fontFamily='Montserrat, sans-serif'>
                Privacidad y personalización
              </Typography>
              <Typography variant='body2' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif'>
                Consulta los datos de tu cuenta y personaliza tu tienda para mejorar la experiencia de tus clientes.
              </Typography>
            </BoxShadowContent>
            <BoxShadowActions firstButtonValue='Personalizar tienda' firstButtonOnClick={() => navigate('/users/my-account/store-settings')} />
          </BoxShadow>
        </Grid>
        <Grid item xs={12} md={6} marginTop={2} paddingLeft={1}>
          <BoxShadow style={{ padding: 0, height: '100%' }}>
            <BoxShadowContent>
              <Typography variant='h6' fontWeight={500} fontSize={18} fontFamily='Montserrat, sans-serif'>
                Tu tienda está verificada
              </Typography>
              <Typography variant='body2' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif'>
                Puedes comenzar a vender, editar y compartir en tu tienda.
              </Typography>
            </BoxShadowContent>
            <BoxShadowActions firstButtonValue='Ver detalles' firstButtonOnClick={() => navigate('/settings/store-status')} />
          </BoxShadow>
        </Grid>
        {!originalData.creditCard && (
          <Grid item xs={12} marginTop={2}>
            <BoxShadow style={{ padding: 0, height: '100%' }}>
              <BoxShadowContent>
                <Typography variant='h6' fontWeight={500} fontSize={18} fontFamily='Montserrat, sans-serif'>
                  No tienes tarjeta de crédito asignada
                </Typography>
                <Typography variant='body2' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  Agrega una tarjeta de crédito para empezar a recibir las ventas que produzca tu tienda
                </Typography>
              </BoxShadowContent>
              <BoxShadowActions firstButtonValue='Gestionar pagos' firstButtonOnClick={() => navigate('/settings/credit-card')} />
            </BoxShadow>
          </Grid>
        )}
        {originalData.w9 === '' && (
          <Grid item xs={12} marginTop={2}>
            <BoxShadow style={{ padding: 0, height: '100%' }}>
              <BoxShadowContent>
                <Typography variant='h6' fontWeight={500} fontSize={18} fontFamily='Montserrat, sans-serif'>
                  Aún no has agregado el W9
                </Typography>
                <Typography variant='body2' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  Agrega el formulario W9 para empezar a recibir las ventas que produzca tu tienda
                </Typography>
              </BoxShadowContent>
              <BoxShadowActions firstButtonValue='Agregar W9' firstButtonOnClick={() => navigate('/settings/w9')} />
            </BoxShadow>
          </Grid>
        )}
      </Grid>
    </TabPanel>
  )
}
