import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'
import { useUserContext } from '../../Context/user'

export function useStore () {
  const { fetchApiGet, fetchApiUploadFile, fetchApiPatch } = fetchLibrary()
  const { errorHandler } = useMessageHandler()
  const { user } = useUserContext()
  const storeSubdomain = user?.user?.store?.subdomain
  const storeId = user?.user?.store?._id

  const GetReferralList = async ({ subdomain = storeSubdomain, selectMonth, referralPercentage }: {subdomain: string, selectMonth: string, referralPercentage: string}) => {
    try {
      const referralList = await fetchApiGet({
        url: `/store/referrals-list/${subdomain}/${selectMonth}/${referralPercentage}`,
        secure: true
      })

      if (referralList instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: referralList, show: true })
      }

      return referralList
    } catch (e) {
      return errorHandler({ errorMessage: 'Get Referral List failed', data: e, show: true })
    }
  }
  const GetDiscounts = async ({ store = storeId }: {store: string}) => {
    try {
      const getDiscountsResult = await fetchApiGet({
        url: `/store/discounts/${store}`,
        secure: true
      })

      if (getDiscountsResult instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: getDiscountsResult, show: true })
      }

      return getDiscountsResult
    } catch (e) {
      return errorHandler({ errorMessage: 'Get discount List failed', data: e, show: true })
    }
  }
  const UploadBanner = async ({ subdomain = storeSubdomain, type, file }: { subdomain: string, type: 'desktop' | 'mobile', file: File }) => {
    try {
      const uploadBannerResult = await fetchApiUploadFile({
        url: `/store/upload-banner-${type}/${subdomain}`,
        secure: true,
        file
      })

      if (uploadBannerResult instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: uploadBannerResult, show: true })
      }

      return uploadBannerResult
    } catch (e) {
      return errorHandler({ errorMessage: 'Upload Banner failed', data: e, show: true })
    }
  }
  const RemoveBanner = async ({ subdomain = storeSubdomain, type }: { subdomain: string, type: 'desktop' | 'mobile' }) => {
    try {
      const removeBannerResult = await fetchApiPatch({
        url: `/store/remove-banner-${type}/${subdomain}`,
        secure: true
      })

      if (removeBannerResult instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: removeBannerResult, show: true })
      }

      return removeBannerResult
    } catch (e) {
      return errorHandler({ errorMessage: 'Remove Banner failed', data: e, show: true })
    }
  }
  return { GetReferralList, GetDiscounts, UploadBanner, RemoveBanner }
}
