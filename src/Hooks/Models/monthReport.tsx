import { fetchLibrary } from '../fetch'
import { useMessageHandler } from '../handlerMessages'

export function useMonthReport () {
  const { fetchApiGet } = fetchLibrary()
  const { errorHandler } = useMessageHandler()

  const GetMonthReport = async () => {
    try {
      const listMonthReport = await fetchApiGet({
        url: '/month-report',
        secure: true
      })

      if (listMonthReport instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listMonthReport, show: true })
      }

      return listMonthReport
    } catch (e) {
      return errorHandler({ errorMessage: 'Get MonthReport failed', data: e, show: true })
    }
  }

  const GetMonthReportState = async () => {
    try {
      const listMonthReport = await fetchApiGet({
        url: '/month-report/state',
        secure: true
      })

      if (listMonthReport instanceof Error) {
        return errorHandler({ errorMessage: 'Success false', data: listMonthReport, show: true })
      }

      return listMonthReport
    } catch (e) {
      return errorHandler({ errorMessage: 'Get MonthReport failed', data: e, show: true })
    }
  }

  return { GetMonthReport, GetMonthReportState }
}
