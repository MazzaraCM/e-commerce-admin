import { fetchLibrary } from '../fetch'
import { useUserContext } from '../../Context/user'
import { useMessageHandler } from '../handlerMessages'
import { setCookie, getCookie, removeCookie } from '../../Utils/utils'

interface LoginResponse {
    success: {action: string, type: string, title: string, message: string, show: boolean};
    data: {url: string, page: string, token: string, user: object};
}

function setAuthToken ({ receivedToken, tokenExpiry }: { receivedToken: string, tokenExpiry: number | undefined }): void {
  setCookie({ cookie: 'authToken', value: receivedToken, expires: tokenExpiry, secure: true })
}

export function getAuthToken (): string | undefined {
  return getCookie({ cookie: 'authToken' })
}

export function isUserAuthenticated () {
  const authToken = getAuthToken()

  return !(!authToken)
}

export function userAuth () {
  const { updateUser } = useUserContext()
  const { fetchApiPost } = fetchLibrary()
  const { errorHandler } = useMessageHandler()

  const login = async ({ email, password, tokenExpiry }: { email: string, password: string, tokenExpiry: number | undefined }): Promise<LoginResponse | Error> => {
    try {
      const loginResult = await fetchApiPost({
        url: '/login',
        body: {
          email: email.toLowerCase().trim(),
          password: password.toString().trim(),
          tokenExpiry
        },
        secure: false
      })

      if (loginResult instanceof Error || loginResult.success.type !== 'success' || !loginResult.data.token) {
        return errorHandler({ errorMessage: 'Success false', data: loginResult, show: true })
      }

      setAuthToken({ receivedToken: loginResult.data.token, tokenExpiry })
      updateUser(loginResult.data)
      return loginResult
    } catch (e) {
      return errorHandler({ errorMessage: 'Authentication failed', data: e, show: true })
    }
  }

  const checkAuthToken = async () => {
    const token = getAuthToken()

    if (token && token !== 'null') {
      try {
        const userData = await fetchApiPost({
          url: '/user-auth-check',
          body: {},
          secure: true
        })

        updateUser(userData)
      } catch (error) {
        return errorHandler({ errorMessage: 'Error al obtener datos del usuario', data: error, show: true })
      }
    }
  }

  const logout = () => () => {
    updateUser(undefined)
    removeCookie({ cookie: 'authToken' })
  }
  return { login, logout, checkAuthToken }
}
