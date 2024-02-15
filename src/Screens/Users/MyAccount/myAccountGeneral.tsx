import React from 'react'
import { ROLE_ADMIN_STORE, ROLE_ADMIN } from '../../../Utils/const'
import { AdminStoreRouteMatch, AdminStoreTabs, AdminStoreTabsContent } from './AdminStore/adminStore'
import { AdminVentadirektaRouteMatch, AdminVentadirektaTabs, AdminVentadirektaTabsContent } from './AdminVentadirekta/adminVentadirekta'

export function useMyAccountGeneral ({ userData, customerData, storeData, tabValue }) {
  const roleFunctions = {
    [ROLE_ADMIN_STORE]: {
      RouteMatch: AdminStoreRouteMatch,
      TabLabels: <AdminStoreTabs tabValue={tabValue} />,
      TabsContent: <AdminStoreTabsContent userData={userData} customerData={customerData} storeData={storeData} />
    },
    [ROLE_ADMIN]: {
      RouteMatch: AdminVentadirektaRouteMatch,
      TabLabels: <AdminVentadirektaTabs tabValue={tabValue} />,
      TabsContent: <AdminVentadirektaTabsContent userData={userData} />
    }
  }
  const { RouteMatch, TabLabels, TabsContent } = roleFunctions[userData.role.name] || {}

  return { RouteMatch, TabLabels, TabsContent }
}
