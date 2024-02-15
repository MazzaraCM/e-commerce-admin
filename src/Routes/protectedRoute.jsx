import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserContext } from '../Context/user'

const useIsAuthenticated = () => {
  const { isAuthenticated } = useUserContext()
  return isAuthenticated
}

const useSecurityLevel = () => {
  const { securityLevel } = useUserContext()
  return securityLevel
}

export function RouteRedirect ({ newPath }) {
  const isUserAuthenticated = useIsAuthenticated()
  if (isUserAuthenticated) {
    return <Navigate to={newPath} replace />
  }

  return <Navigate to='/login' replace />
};
export function ProtectedRouteAuthenticated ({ children, securityLevel }) {
  const isUserAuthenticated = useIsAuthenticated()
  const userSecurityLevel = useSecurityLevel()
  const location = useLocation()

  if (!isUserAuthenticated) {
    return <Navigate to='/login' state={{ location }} replace />
  }
  if (securityLevel > userSecurityLevel) {
    return <Navigate to='/not-access' replace />
  }

  return children
};
export function ProtectedRouteNotAuthenticated () {
  const isUserAuthenticated = useIsAuthenticated()
  const { state } = useLocation()
  if (isUserAuthenticated) {
    return <Navigate to={state?.location?.pathname ?? '/dashboard'} replace />
  }

  return <Outlet />
};
