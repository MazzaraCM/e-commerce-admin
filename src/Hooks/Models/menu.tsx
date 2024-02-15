import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'
import { ObjectId } from 'mongodb'
import { useMenuContext } from '../../Context/menu'

interface GetMenuResponse {
  menu: {color: string, date_created: string, icon: string, is_dashboard: boolean, name: string, status: string, url: string, _id: ObjectId};
  childs: Array<{menu: object, children: object}>;
}

export function useMenu () {
  const { fetchApiPost } = fetchLibrary()
  const { errorHandler } = useMessageHandler()
  const { updateMenu } = useMenuContext()

  const getMenu = async ({ userId }: { userId: typeof ObjectId }): Promise<GetMenuResponse | Error> => {
    try {
      const menuResult = await fetchApiPost({
        url: '/get-menu-option',
        body: {
          userId
        },
        secure: true
      })

      if (menuResult instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: menuResult, show: true })
      }

      updateMenu(menuResult)
      return menuResult
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Menu failed', data: e, show: true })
    }
  }

  return { getMenu }
}
