import { useState, useContext, createContext } from 'react'
// import { useMediaQuery } from '@mui/material'

const SidebarContext = createContext()

export const useSidebarContext = () => {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }

  return context
}

export const SidebarProvider = ({ children }) => {
  // const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const [openSidebar, setOpenSidebar] = useState(false)
  const [openByHover, setOpenByHover] = useState(false)

  const handleSidebar = () => {
    setOpenSidebar((state) => !state)
    setOpenByHover(false)
  }

  const value = {
    openSidebar,
    handleSidebar,
    openByHover,
    setOpenByHover
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}
