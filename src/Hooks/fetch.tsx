import { validProductionAdminUrl } from '../Utils/utils'
import { getAuthToken } from './Models/userAuth'
import { useMessageHandler } from './handlerMessages'

export function fetchLibrary () {
  const { errorHandler } = useMessageHandler()

  const fetchApiPost = async ({ url, body, secure }: { url: string, body: object, secure: boolean }): Promise => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: secure ? `Bearer ${getAuthToken()}` : ''
    }
    const request = await fetch(validProductionAdminUrl({ url: `${import.meta.env.VITE_API_VERSION}${url}` }), {
      headers,
      method: 'POST',
      body: JSON.stringify(body)
    })

    if (!request.ok) {
      return errorHandler({ errorMessage: 'Network response was not ok', data: request, show: false })
    }

    const response = await request.json()

    return response
  }

  const fetchApiGet = async ({ url, secure }: { url: string, secure: boolean }): Promise => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: secure ? `Bearer ${getAuthToken()}` : ''
    }
    const request = await fetch(validProductionAdminUrl({ url: `${import.meta.env.VITE_API_VERSION}${url}` }), {
      headers,
      method: 'GET'
    })

    if (!request.ok) {
      return errorHandler({ errorMessage: 'Network response was not ok', data: request, show: false })
    }

    const response = await request.json()

    return response
  }

  const fetchApiPatch = async ({ url, body, secure }: { url: string, body?: object, secure: boolean }): Promise => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: secure ? `Bearer ${getAuthToken()}` : ''
    }
    const request = await fetch(validProductionAdminUrl({ url: `${import.meta.env.VITE_API_VERSION}${url}` }), {
      headers,
      method: 'PATCH',
      body: JSON.stringify(body)
    })

    if (!request.ok) {
      return errorHandler({ errorMessage: 'Network response was not ok', data: request, show: false })
    }

    const response = await request.json()

    return response
  }

  const fetchApiDelete = async ({ url, body, secure }: { url: string, body: object, secure: boolean }): Promise => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: secure ? `Bearer ${getAuthToken()}` : ''
    }
    const request = await fetch(validProductionAdminUrl({ url: `${import.meta.env.VITE_API_VERSION}${url}` }), {
      headers,
      method: 'DELETE',
      body: JSON.stringify(body)
    })

    if (!request.ok) {
      return errorHandler({ errorMessage: 'Network response was not ok', data: request, show: false })
    }

    const response = await request.json()

    return response
  }

  const fetchApiUploadFile = async ({ url, file, secure }: { url: string, file: File, secure: boolean }): Promise => {
    if (!(file instanceof File)) {
      console.error('El parámetro "file" no es un objeto File válido.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    const headers = {
      Accept: 'application/json',
      Authorization: secure ? `Bearer ${getAuthToken()}` : ''
    }
    const request = await fetch(validProductionAdminUrl({ url: `${import.meta.env.VITE_API_VERSION}${url}` }), {
      headers,
      method: 'POST',
      body: formData
    })

    if (!request.ok) {
      return errorHandler({ errorMessage: 'Network response was not ok', data: request, show: false })
    }

    const response = await request.json()

    return response
  }

  const fetchGetUrl = async ({ url }: { url: string }): Promise => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    const request = await fetch(url, {
      headers,
      method: 'GET'
    })

    if (!request.ok) {
      return errorHandler({ errorMessage: 'Network response was not ok', data: request, show: false })
    }

    const response = await request.json()

    return response
  }

  return { fetchApiPost, fetchApiGet, fetchApiPatch, fetchApiDelete, fetchGetUrl, fetchApiUploadFile }
}
