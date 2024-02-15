import { useMessageHandler } from '../Hooks/handlerMessages'
import Cookies from 'js-cookie'
import { useLocation, matchPath } from 'react-router-dom'

const { errorHandler } = useMessageHandler()

export function validProductionAdminUrl ({ url }: { url: string }): string {
  if (import.meta.env.VITE_APP_ENV === 'production') {
    return `${import.meta.env.VITE_API_URL}${url}`
  } else {
    return `${import.meta.env.VITE_API_URL_LOCAL}${url}`
  }
}
export function setCookie ({ cookie, value, expires, secure }: { cookie: string, value: any, expires: number | undefined, secure: boolean }): void {
  Cookies.set(cookie, value, { expires, secure })
}
export function getCookie ({ cookie }: { cookie: string }): string | undefined {
  return Cookies.get(cookie)
}
export function removeCookie ({ cookie }: { cookie: string }): void {
  return Cookies.remove(cookie)
}
export async function cryptoEncoder ({ value }: { value: string }): Promise<string | Error> {
  const encoder = new TextEncoder()
  const data = encoder.encode(value)

  try {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedValue = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
    return hashedValue
  } catch (error) {
    return errorHandler({ errorMessage: 'Encriptation Failed', data: error, show: false })
  }
}
export function useRouteMatch (patterns) {
  const { pathname } = useLocation()

  for (const element of patterns) {
    const pattern = element
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }
  return patterns[0]
}

export function deepEqual (obj1, obj2) {
  if (obj1 === obj2) {
    return true
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}
