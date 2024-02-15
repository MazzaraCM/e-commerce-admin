import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'
import { useUserContext } from '../../Context/user'

export function useOrders () {
  const { fetchApiGet, fetchApiPost } = fetchLibrary()
  const { errorHandler } = useMessageHandler()
  const { user } = useUserContext()
  const userSubdomain = user?.user?.store?.subdomain

  const ListOrders = async ({ subdomain = userSubdomain, selectMonth }: {subdomain?: string, selectMonth: string}) => {
    try {
      const listOrders = await fetchApiGet({
        url: `/orders/${subdomain}/${selectMonth}`,
        secure: true
      })

      if (listOrders instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listOrders, show: true })
      }

      return listOrders
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Orders failed', data: e, show: true })
    }
  }

  const GetOrder = async ({ orderName }: {orderName: string}) => {
    try {
      const listOrders = await fetchApiGet({
        url: `/orders/${orderName}`,
        secure: true
      })

      if (listOrders instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listOrders, show: true })
      }

      return listOrders
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Order failed', data: e, show: true })
    }
  }

  const ListOrdersTransactions = async ({ selectMonth }: {selectMonth: string}) => {
    try {
      const listOrders = await fetchApiGet({
        url: `/orders/transactions/${selectMonth}`,
        secure: true
      })

      if (listOrders instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listOrders, show: true })
      }

      return listOrders
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Orders Transactions failed', data: e, show: true })
    }
  }

  const ListFormReturns = async ({ selectMonth }: {selectMonth: string}) => {
    try {
      const listOrders = await fetchApiGet({
        url: `/orders/form-returns/${selectMonth}`,
        secure: true
      })

      if (listOrders instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listOrders, show: true })
      }

      return listOrders
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Form Returns failed', data: e, show: true })
    }
  }

  const DownloadFormReturns = async ({ body }: {body: {select_month: string, data_file: object[]}}) => {
    try {
      const listOrders = await fetchApiPost({
        url: '/orders/form-returns-generate',
        secure: true,
        body
      })

      if (listOrders instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listOrders, show: true })
      }

      return listOrders
    } catch (e) {
      return errorHandler({ errorMessage: 'Download Form Returns failed', data: e, show: true })
    }
  }

  const DownloadTransactions = async ({ body }: {body: {select_month: string, data_file: object[]}}) => {
    try {
      const listOrders = await fetchApiPost({
        url: '/orders/transactions-generate',
        secure: true,
        body
      })

      if (listOrders instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listOrders, show: true })
      }

      return listOrders
    } catch (e) {
      return errorHandler({ errorMessage: 'Download Transactions failed', data: e, show: true })
    }
  }

  return { ListOrders, GetOrder, ListOrdersTransactions, ListFormReturns, DownloadFormReturns, DownloadTransactions }
}
