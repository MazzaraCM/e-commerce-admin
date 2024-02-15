import React from 'react'
import { BoxShadow } from '../../../../../Components/Common/boxShadow/boxShadow'
import { BoxShadowHeader } from '../../../../../Components/Common/boxShadowHeader/boxShadowHeader'

import TabPanel from '@mui/lab/TabPanel'

export function TabHome ({ userData }) {
  const originalData = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email
  }

  return (
    <TabPanel value='/users/my-account' sx={{ p: 0 }}>
      <BoxShadow>
        <BoxShadowHeader title={`Bienvenido, ${originalData.first_name} ${originalData.last_name}`} subtitle='Gestiona tu información, tu tienda y tu privacidad.' sx={{ textAlign: 'center' }} />
      </BoxShadow>
    </TabPanel>
  )
}
