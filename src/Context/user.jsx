import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function useUserContext () {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('UserContext must be used within a UserProvider')
  }
  return context
}

export function UserProvider ({ children }) {
  const [user, setUser] = useState(null)

  const isAuthenticated = !!user
  const securityLevel = user?.user?.role?.security_level ?? undefined

  const updateUser = (userData) => {
    setUser(userData)
  }

  return (
    <UserContext.Provider value={{ user, updateUser, isAuthenticated, securityLevel }}>
      {children}
    </UserContext.Provider>
  )
}
