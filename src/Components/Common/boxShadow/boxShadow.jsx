import { BoxStyled } from './boxStyled'

export function BoxShadow ({ children, ...props }) {
  return <BoxStyled {...props}>{children}</BoxStyled>
}
