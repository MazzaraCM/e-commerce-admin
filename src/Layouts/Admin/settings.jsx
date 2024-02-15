import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../../Components/General/NavbarAdmin/navbarAdmin'
import { SidebarProvider } from '../../Context/sidebar'
import { MenuProvider } from '../../Context/menu'
import FooterBasic from '../../Components/General/FooterBasic/footerBasic'
import { Toaster } from 'sonner'
import { useUserContext } from '../../Context/user'

export default function SimpleLayoutAdmin () {
  const { user } = useUserContext()
  const userData = user?.user

  return (
    <>
      <Toaster richColors />
      <MenuProvider>
        <SidebarProvider>
          <NavbarAdmin sidebar={false} />
          {userData && (
            <Outlet context={userData} />
          )}
          <FooterBasic sidebar='false' />
        </SidebarProvider>
      </MenuProvider>
    </>
  )
}
