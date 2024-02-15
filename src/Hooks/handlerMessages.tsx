import { toast } from 'sonner'

export function useMessageHandler () {
  const errorHandler = ({ errorMessage, data, show }: { errorMessage: string, data: object, show: boolean }): Error => {
    if (import.meta.env.VITE_APP_ENV !== 'production') {
      console.error(data)
    }
    if (show) {
      toastHandler({ message: errorMessage, type: 'error' })
    }
    throw new Error(errorMessage)
  }

  const successHandler = ({ successMessage, data, show }: { successMessage: string, data: object, show: boolean }): void => {
    if (import.meta.env.VITE_APP_ENV !== 'production') {
      console.log(data)
    }
    if (show) {
      toastHandler({ message: successMessage, type: 'success' })
    }
  }

  const toastHandler = ({ message, type }: { message: string, type: 'success' | 'error' | 'info' | 'warning' }): void => {
    toast[type](message)
  }

  return { errorHandler, successHandler, toastHandler }
}
