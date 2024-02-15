import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'

export function useGeneralSettings () {
  const { fetchApiGet } = fetchLibrary()
  const { errorHandler } = useMessageHandler()

  const GetSettings = async () => {
    try {
      const getSettings = await fetchApiGet({
        url: '/general-settings',
        secure: true
      })

      if (getSettings instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: getSettings, show: true })
      }

      return getSettings
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Settings failed', data: e, show: true })
    }
  }

  const GetBanners = async () => {
    try {
      const listBanners = await fetchApiGet({
        url: '/general-settings/list-banners',
        secure: true
      })

      if (listBanners instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listBanners, show: true })
      }

      return listBanners
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Banners failed', data: e, show: true })
    }
  }

  return { GetSettings, GetBanners }
}
