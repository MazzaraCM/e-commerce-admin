import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'

interface ThemeBody {
    id?: string,
    primary_color?: string,
    secondary_color?: string,
    background_color?: string,
    text_color?: string,
    alternative_color_text?: string,
    success_color?: string,
    error_color?: string,
    status?: 'Active' | 'Inactive',
}

export function useThemes () {
  const { fetchApiGet, fetchApiPost, fetchApiPatch, fetchApiDelete } = fetchLibrary()
  const { errorHandler } = useMessageHandler()

  const ListThemes = async () => {
    try {
      const listThemes = await fetchApiGet({
        url: '/store-themes',
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

  const CreateTheme = async ({ body } : { body: ThemeBody }) => {
    try {
      const create = await fetchApiPost({
        url: '/store-themes',
        body,
        secure: true
      })

      if (create instanceof Error || !create.success) {
        return errorHandler({ errorMessage: 'Success false', data: create, show: true })
      }

      return create
    } catch (e) {
      return errorHandler({ errorMessage: 'Create Theme failed', data: e, show: true })
    }
  }

  const UpdateTheme = async ({ body } : { body: ThemeBody }) => {
    try {
      const update = await fetchApiPatch({
        url: '/store-themes',
        body,
        secure: true
      })

      if (update instanceof Error || !update.data.success) {
        return errorHandler({ errorMessage: 'Success false', data: update, show: true })
      }

      return update
    } catch (e) {
      return errorHandler({ errorMessage: 'Update Theme failed', data: e, show: true })
    }
  }

  const DisableTheme = async ({ body } : { body: ThemeBody }) => {
    try {
      const disable = await fetchApiPatch({
        url: '/store-themes/change-status',
        body,
        secure: true
      })

      if (disable instanceof Error || !disable.data.ok) {
        return errorHandler({ errorMessage: 'Success false', data: disable, show: true })
      }

      return disable
    } catch (e) {
      return errorHandler({ errorMessage: 'Disable Theme failed', data: e, show: true })
    }
  }

  const DeleteTheme = async ({ body } : { body: ThemeBody }) => {
    try {
      const deleteTheme = await fetchApiDelete({
        url: '/store-themes',
        body,
        secure: true
      })

      if (deleteTheme instanceof Error || !deleteTheme.data.ok) {
        return errorHandler({ errorMessage: 'Success false', data: deleteTheme, show: true })
      }

      return deleteTheme
    } catch (e) {
      return errorHandler({ errorMessage: 'Delete Theme failed', data: e, show: true })
    }
  }

  return { ListThemes, CreateTheme, UpdateTheme, DisableTheme, DeleteTheme }
}
