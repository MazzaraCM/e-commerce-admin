import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'
import { ObjectId } from 'mongodb'

export function useUser () {
  const { fetchApiPost, fetchApiPatch } = fetchLibrary()
  const { errorHandler } = useMessageHandler()

  const getUser = async ({ userId }: { userId: typeof ObjectId }) => {
    try {
      const userResult = await fetchApiPost({
        url: '/users/my-account',
        body: {
          userId
        },
        secure: true
      })

      if (userResult instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: userResult, show: true })
      }

      return userResult
    } catch (e) {
      return errorHandler({ errorMessage: 'Get User failed', data: e, show: true })
    }
  }

  const UpdateUser = async ({ body }) => {
    try {
      const updateUser = await fetchApiPatch({
        url: `/users/${body._id}`,
        body,
        secure: true
      })

      if (updateUser instanceof Error || !updateUser.data.ok) {
        return errorHandler({ errorMessage: 'Success false', data: updateUser, show: true })
      }

      return updateUser
    } catch (e) {
      return errorHandler({ errorMessage: 'Update User failed', data: e, show: true })
    }
  }

  return { getUser, UpdateUser }
}
