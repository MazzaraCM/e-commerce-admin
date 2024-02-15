import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'
import { useUserContext } from '../../Context/user'

export function useCustomer () {
  const { fetchApiGet, fetchApiPost, fetchApiUploadFile, fetchGetUrl } = fetchLibrary()
  const { errorHandler } = useMessageHandler()
  const { user } = useUserContext()
  const userStoreId = user?.user?.store?._id
  const userCustomerId = user?.user?.store?.customer._id

  const ListCustomers = async () => {
    try {
      const listCustomer = await fetchApiGet({
        url: '/customers/list-customers',
        secure: true
      })

      if (listCustomer instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listCustomer, show: true })
      }

      return listCustomer
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Customers failed', data: e, show: true })
    }
  }
  const ListMyCustomers = async ({ storeId = userStoreId } : { storeId?: string }) => {
    try {
      const listCustomer = await fetchApiGet({
        url: `/customers/my-customers/${storeId}`,
        secure: true
      })

      if (listCustomer instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listCustomer, show: true })
      }

      return listCustomer
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Customers failed', data: e, show: true })
    }
  }
  const UpdateCreditCard = async ({ body } : { body: object }) => {
    try {
      const updateCreditCard = await fetchApiPost({
        url: '/customers/update-credit-card',
        secure: true,
        body
      })

      if (updateCreditCard instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: updateCreditCard, show: true })
      }

      return updateCreditCard
    } catch (e) {
      return errorHandler({ errorMessage: 'Update Credit Card failed', data: e, show: true })
    }
  }
  const UploadW9 = async ({ storeId = userStoreId, customerId = userCustomerId, file } : { storeId?: string, customerId?: string, file: File }) => {
    try {
      const uploadW9 = await fetchApiUploadFile({
        url: `/customers/w9/${storeId}/${customerId}`,
        secure: true,
        file
      })

      if (uploadW9 instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: uploadW9, show: true })
      }

      return uploadW9
    } catch (e) {
      return errorHandler({ errorMessage: 'Upload W9 failed', data: e, show: true })
    }
  }
  const StatementReport = async ({ selectMonth }: {selectMonth: string}) => {
    try {
      const listCustomer = await fetchApiGet({
        url: `/customers/list-statements/${selectMonth}`,
        secure: true
      })

      if (listCustomer instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listCustomer, show: true })
      }

      return listCustomer
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Statement Reports failed', data: e, show: true })
    }
  }
  const DownloadStatementReport = async ({ body }: {body: {select_month: string, data_file: object[]}}) => {
    try {
      const listCustomer = await fetchApiPost({
        url: '/customers/generate-report',
        secure: true,
        body
      })

      if (listCustomer instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listCustomer, show: true })
      }

      return listCustomer
    } catch (e) {
      return errorHandler({ errorMessage: 'Download Statement Reports failed', data: e, show: true })
    }
  }
  const GetContactForm = async () => {
    try {
      const listCustomer = await fetchGetUrl({
        url: 'https://s2f.2becommerce.com/vtd/api/contacts'
      })

      if (listCustomer instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listCustomer, show: true })
      }

      return listCustomer
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Contact Forms failed', data: e, show: true })
    }
  }
  return { ListCustomers, ListMyCustomers, UpdateCreditCard, UploadW9, StatementReport, DownloadStatementReport, GetContactForm }
}
