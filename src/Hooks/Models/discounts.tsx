import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'
import { useUserContext } from '../../Context/user'

interface DiscountBody {
  id: string,
  code?: string,
  discount_type?: 'Percent' | 'Amount',
  amount?: number,
  store?: string,
  date_start?: Date,
  date_end?: Date,
  status?: 'Active' | 'Inactive',
  user?: string
}

export function useDiscounts () {
  const { fetchApiGet, fetchApiPost, fetchApiPatch, fetchApiDelete } = fetchLibrary()
  const { errorHandler } = useMessageHandler()
  const { user } = useUserContext()
  const userId = user?.user?._id
  const userStoreId = user?.user?.store?._id

  const ListMyDiscounts = async ({ storeId = userStoreId } : { storeId?: string }) => {
    try {
      const listDiscounts = await fetchApiGet({
        url: `/discount-codes/list/${storeId}`,
        secure: true
      })

      if (listDiscounts instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listDiscounts, show: true })
      }

      return listDiscounts
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Discounts failed', data: e, show: true })
    }
  }

  const ListAllDiscounts = async () => {
    try {
      const listDiscounts = await fetchApiGet({
        url: '/discount-codes',
        secure: true
      })

      if (listDiscounts instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listDiscounts, show: true })
      }

      return listDiscounts
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Discounts failed', data: e, show: true })
    }
  }

  const ListReturnCodes = async () => {
    try {
      const listDiscounts = await fetchApiGet({
        url: '/discount-codes/returns',
        secure: true
      })

      if (listDiscounts instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listDiscounts, show: true })
      }

      return listDiscounts
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Discounts failed', data: e, show: true })
    }
  }

  const CreateDiscount = async ({ body, storeId = userStoreId } : { body: DiscountBody, storeId?: string }) => {
    body.store = storeId

    try {
      const createDiscounts = await fetchApiPost({
        url: '/discount-codes',
        body,
        secure: true
      })

      if (createDiscounts instanceof Error || !createDiscounts.success) {
        return errorHandler({ errorMessage: 'Success false', data: createDiscounts, show: true })
      }

      return createDiscounts
    } catch (e) {
      return errorHandler({ errorMessage: 'Create Discount failed', data: e, show: true })
    }
  }

  const UpdateDiscount = async ({ body, storeId = userStoreId } : { body: DiscountBody, storeId?: string }) => {
    body.store = storeId

    try {
      const updateDiscount = await fetchApiPatch({
        url: '/discount-codes',
        body,
        secure: true
      })

      if (updateDiscount instanceof Error || !updateDiscount.data.ok) {
        return errorHandler({ errorMessage: 'Success false', data: updateDiscount, show: true })
      }

      return updateDiscount
    } catch (e) {
      return errorHandler({ errorMessage: 'Update Discount failed', data: e, show: true })
    }
  }

  const DisableDiscount = async ({ body } : { body: DiscountBody }) => {
    body.user = userId

    try {
      const disableDiscount = await fetchApiPatch({
        url: '/discount-codes/change-status',
        body,
        secure: true
      })

      if (disableDiscount instanceof Error || !disableDiscount.data.ok) {
        return errorHandler({ errorMessage: 'Success false', data: disableDiscount, show: true })
      }

      return disableDiscount
    } catch (e) {
      return errorHandler({ errorMessage: 'Disable Discount failed', data: e, show: true })
    }
  }

  const DeleteDiscount = async ({ body } : { body: DiscountBody }) => {
    try {
      const deleteDiscount = await fetchApiDelete({
        url: '/discount-codes',
        body,
        secure: true
      })

      if (deleteDiscount instanceof Error || !deleteDiscount.data.ok) {
        return errorHandler({ errorMessage: 'Success false', data: deleteDiscount, show: true })
      }

      return deleteDiscount
    } catch (e) {
      return errorHandler({ errorMessage: 'Delete Discount failed', data: e, show: true })
    }
  }

  return { ListMyDiscounts, ListAllDiscounts, ListReturnCodes, CreateDiscount, UpdateDiscount, DisableDiscount, DeleteDiscount }
}
