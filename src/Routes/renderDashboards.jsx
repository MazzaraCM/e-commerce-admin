import React from 'react'
import { useUserContext } from '../Context/user'
import { DASHBOARD_ADMIN, DASHBOARD_STORE, DASHBOARD_FINANCE, DASHBOARD_CUSTOMER_SERVICE } from '../Utils/const'

const DashboardAdmin = React.lazy(() => import('../Screens/Dashboards/dashboardAdmin/dashboard'))
const DashboardStore = React.lazy(() => import('../Screens/Dashboards/dashboardStore/dashboard'))
const DashboardFinance = React.lazy(() => import('../Screens/Dashboards/dashboardFinance/dashboard'))
const DashboardCustomerService = React.lazy(() => import('../Screens/Dashboards/dashboardCustomerService/dashboard'))

export function Dashboard () {
  const { user } = useUserContext()
  if (user.user.role.dashboard.name === DASHBOARD_ADMIN) {
    return <DashboardAdmin />
  } else if (user.user.role.dashboard.name === DASHBOARD_STORE) {
    return <DashboardStore />
  } else if (user.user.role.dashboard.name === DASHBOARD_FINANCE) {
    return <DashboardFinance />
  } else if (user.user.role.dashboard.name === DASHBOARD_CUSTOMER_SERVICE) {
    return <DashboardCustomerService />
  }
}
