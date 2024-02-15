import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'
import { useUserContext } from '../../Context/user'

export function useStatement () {
  const { fetchApiGet } = fetchLibrary()
  const { errorHandler } = useMessageHandler()
  const { user } = useUserContext()
  const userSubdomain = user?.user?.store?.subdomain

  const GetStatement = async ({ subdomain = userSubdomain, selectMonth }: {subdomain: string, selectMonth: string}) => {
    try {
      const listStatement = await fetchApiGet({
        url: `/statement/${subdomain}/${selectMonth}`,
        secure: true
      })

      if (listStatement instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listStatement, show: true })
      }

      return listStatement
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Statement failed', data: e, show: true })
    }
  }
  return { GetStatement }
}
