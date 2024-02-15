import React from 'react'
import { BoxShadow } from '../../../../../Components/Common/boxShadow/boxShadow'
import { BoxShadowHeader } from '../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InformationButton } from '../../../../../Components/Common/informationButton/informationButton'

import TabPanel from '@mui/lab/TabPanel'

export function TabPersonalInformation ({ userData, customerData }) {
  const originalData = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.email,
    phone: customerData.phone,
    billing_country: customerData.billing_country,
    billing_city: customerData.billing_city,
    billing_state: customerData.billing_state,
    billing_zipcode: customerData.billing_zipcode,
    billing_address: customerData.billing_address,
    billing_address2: customerData.billing_address2 !== 'null' ? customerData.billing_address2 : ''
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
        <InformationButton label='email' href='email' value={originalData.email} />
        <InformationButton label='phone' href='phone' value={originalData.phone} divider={false} />
      </BoxShadow>
      <BoxShadow sx={{ marginTop: 2 }}>
        <BoxShadowHeader title='Address Information' subtitle='Información sobre tu dirección' />
        <InformationButton label='Country' href='country' value={originalData.billing_country} />
        <InformationButton label='City' href='city' value={originalData.billing_city} />
        <InformationButton label='Province' href='province' value={originalData.billing_state} />
        <InformationButton label='ZIP Code' href='zipcode' value={originalData.billing_zipcode} />
        <InformationButton label='Address Line 1' href='addressline' value={originalData.billing_address} />
        <InformationButton label='Address Line 2' href='addressline2' value={originalData.billing_address2} divider={false} />
      </BoxShadow>
    </TabPanel>
  )
}
