import { backgroundOpacity } from '../../../Themes/colors'
import { FooterStyled } from './muiStyles'
import { useSidebarContext } from '../../../Context/sidebar'

export default function FooterBasic ({ sidebar = true }) {
  const { openSidebar } = useSidebarContext()
  return (
    <FooterStyled className='footer-basic' sidebar={sidebar ? 'true' : 'false'} open={openSidebar} style={{ backgroundColor: backgroundOpacity() }}>
      <h6>Admin</h6>
    </FooterStyled>
  )
}
