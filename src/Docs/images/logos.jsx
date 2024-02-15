import { useThemeContext } from '../../Context/themes'
import logoWhite from '../../public/assets/logos/logo-ventadirekta-white2.webp'
import logoBlack from '../../public/assets/logos/logo-ventadirekta-black2.webp'

export function LogoImgColor ({ props }) {
  return (
    <img src={logoBlack} alt='Logo Admin' className='logo' style={props} />
  )
}

export function LogoImgWhite ({ props }) {
  return (
    <img src={logoWhite} alt='Logo Admin' className='logo' style={props} />
  )
}

export function LogoImgByTheme (props) {
  const { theme } = useThemeContext()

  return (
    <>
      {theme.palette.mode === 'light'
        ? (
          <LogoImgColor props={props} />
          )
        : (
          <LogoImgWhite props={props} />
          )}
    </>
  )
}
