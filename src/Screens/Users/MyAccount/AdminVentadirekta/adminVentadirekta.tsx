import React from 'react'
import { TabHome } from './Tabs/TabHome'
import { TabPersonalInformation } from './Tabs/TabPersonalInformation'
import { Link } from 'react-router-dom'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export const AdminVentadirektaRouteMatch = ['/users/my-account', '/users/my-account/personal-information']

export function AdminVentadirektaTabs ({ tabValue }) {
  return (
    <Tabs
      value={tabValue}
      orientation='vertical'
      variant='fullWidth'
    >
      <Tab value='/users/my-account' to='/users/my-account' component={Link} label='Home' />
      <Tab value='/users/my-account/personal-information' to='/users/my-account/personal-information' component={Link} label='Personal Information' />
    </Tabs>
  )
}

export function AdminVentadirektaTabsContent ({ userData }) {
  return (
    <>
      <TabHome userData={userData} />
      <TabPersonalInformation userData={userData} />
    </>
  )
}
