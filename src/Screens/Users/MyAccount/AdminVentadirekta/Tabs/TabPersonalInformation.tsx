import React from 'react'
import { BoxShadow } from '../../../../../Components/Common/boxShadow/boxShadow'
import { BoxShadowHeader } from '../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InformationButton } from '../../../../../Components/Common/informationButton/informationButton'

import TabPanel from '@mui/lab/TabPanel'

export function TabPersonalInformation ({ userData }) {
  const originalData = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email
  }

  return (
    <TabPanel value='/users/my-account/personal-information' sx={{ p: 0 }}>
      <BoxShadow>
        <BoxShadowHeader title='Basic Information' subtitle='Información básica sobre ti' />
        <InformationButton label='First Name' href='name' value={originalData.first_name} />
        <InformationButton label='Last Name' href='name' value={originalData.last_name} divider={false} />
      </BoxShadow>
      <BoxShadow sx={{ marginTop: 2 }}>
        <BoxShadowHeader title='Contact Information' subtitle='Información sobre tu dirección' />
        <InformationButton label='email' href='email' value={originalData.email} divider={false} />
      </BoxShadow>
    </TabPanel>
  )
}
