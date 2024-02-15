import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarBasic from '../../Components/General/NavbarBasic/navbarBasic'
import { SidebarProvider } from '../../Context/sidebar'
import { Toaster } from 'sonner'

export default function LayoutAuth () {
  return (
    <SidebarProvider>
      <Toaster richColors />
      <NavbarBasic />
      <Outlet />
    </SidebarProvider>
  )
}
