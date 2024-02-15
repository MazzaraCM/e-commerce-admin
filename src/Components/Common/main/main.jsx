import { useSidebarContext } from '../../../Context/sidebar'
import { BoxStyled } from './muyStyled'

export function Main ({ children, sidebar = true, ...props }) {
  const { openSidebar } = useSidebarContext()

  return <BoxStyled open={openSidebar} sidebar={sidebar ? 'true' : 'false'} {...props}>{children}</BoxStyled>
}
