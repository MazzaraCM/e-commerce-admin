import { useThemeContext } from '../Context/themes'

function Theme () {
  const { theme } = useThemeContext()
  return theme
}

export function primaryMain () {
  return Theme().palette.primary.main
}
export function primaryLight () {
  return Theme().palette.primary.light
}
export function primaryDark () {
  return Theme().palette.primary.dark
}
export function primaryContrastText () {
  return Theme().palette.primary.contrastText
}
export function textMain () {
  return Theme().palette.text.main
}
export function textStatic () {
  return Theme().palette.text.static
}
export function textOpacity () {
  return Theme().palette.text.opacity
}
export function backgroundMain () {
  return Theme().palette.background.main
}
export function backgroundLight () {
  return Theme().palette.background.light
}
export function backgroundDark () {
  return Theme().palette.background.dark
}
export function backgroundContrastText () {
  return Theme().palette.background.contrastText
}
export function backgroundOpacity () {
  return Theme().palette.background.opacity
}
export function error () {
  return Theme().palette.error.main
}
export function disabledText () {
  return Theme().palette.disabled.text
}
export function disabledBackground () {
  return Theme().palette.disabled.background
}
