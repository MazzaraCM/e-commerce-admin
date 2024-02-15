import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../../Components/General/NavbarAdmin/navbarAdmin'
import { Sidebar } from '../../Components/General/SideBar/sidebar'
import { SidebarProvider } from '../../Context/sidebar'
import { MenuProvider } from '../../Context/menu'
import FooterBasic from '../../Components/General/FooterBasic/footerBasic'
import { Toaster } from 'sonner'

export default function LayoutAdmin () {
  return (
    <>
      <Toaster richColors />
      <MenuProvider>
        <SidebarProvider>
          <NavbarAdmin />
          <Sidebar />
          <Outlet />
          <FooterBasic />
        </SidebarProvider>
      </MenuProvider>
    </>
  )
}
