import React from 'react'
import { TabHome } from './Tabs/TabHome'
import { TabPersonalInformation } from './Tabs/TabPersonalInformation'
import { TabStoreSettings } from './Tabs/TabStoreSettings'
import { TabPaymentSettings } from './Tabs/TabPaymentSettings'
import { Link } from 'react-router-dom'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export const AdminStoreRouteMatch = ['/users/my-account', '/users/my-account/personal-information', '/users/my-account/store-settings', '/users/my-account/payment-settings']

export function AdminStoreTabs ({ tabValue }) {
  return (
    <Tabs
      value={tabValue}
      orientation='vertical'
      variant='fullWidth'
    >

      <Tab value='/users/my-account' to='/users/my-account' component={Link} label='Home' />
      <Tab value='/users/my-account/personal-information' to='/users/my-account/personal-information' component={Link} label='Personal Information' />
      <Tab value='/users/my-account/store-settings' to='/users/my-account/store-settings' component={Link} label='Store Settings' />
      <Tab value='/users/my-account/payment-settings' to='/users/my-account/payment-settings' component={Link} label='Payment Settings' />
    </Tabs>
  )
}

export function AdminStoreTabsContent ({ storeData, userData, customerData }) {
  return (
    <>
      <TabHome userData={userData} customerData={customerData} />
      <TabPersonalInformation userData={userData} customerData={customerData} />
      <TabStoreSettings storeData={storeData} userData={userData} />
      <TabPaymentSettings customerData={customerData} />
    </>
  )
}
