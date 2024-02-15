import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'

export function useLanguages () {
  const { fetchApiGet } = fetchLibrary()
  const { errorHandler } = useMessageHandler()

  const GetLanguages = async () => {
    try {
      const listLanguages = await fetchApiGet({
        url: '/languages',
        secure: true
      })

      if (listLanguages instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listLanguages, show: true })
      }

      return listLanguages
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Languages failed', data: e, show: true })
    }
  }

  return { GetLanguages }
}
