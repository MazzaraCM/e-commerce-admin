import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'

export function useIndex () {
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

  const GetThemes = async () => {
    try {
      const listThemes = await fetchApiGet({
        url: '/themes',
        secure: true
      })

      if (listThemes instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listThemes, show: true })
      }

      return listThemes
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Themes failed', data: e, show: true })
    }
  }

  const GetCollections = async () => {
    try {
      const listCollections = await fetchApiGet({
        url: '/collections',
        secure: true
      })

      if (listCollections instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listCollections, show: true })
      }

      return listCollections
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Collections failed', data: e, show: true })
    }
  }

  return { GetLanguages, GetThemes, GetCollections }
}
