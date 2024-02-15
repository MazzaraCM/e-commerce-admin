import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../Hooks/handlerWatcher'
import { useMonthReport } from '../../Hooks/Models/monthReport'
import { useCustomer } from '../../Hooks/Models/customers'
import { Main } from '../../Components/Common/main/main'
import { DataGridTable } from '../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../../Utils/const'
import { useDataGridTable } from '../../Hooks/dataGridTable'
import { MonthReportColumns, MonthReportColumnsNotVisible } from './TableColumns'
import { BoxShadow } from '../../Components/Common/boxShadow/boxShadow'
import { useMessageHandler } from '../../Hooks/handlerMessages'
import moment from 'moment'

import LoadingButton from '@mui/lab/LoadingButton'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'

export default function AllOrders () {
  const { GetMonthReportState } = useMonthReport()
  const { DownloadStatementReport, StatementReport } = useCustomer()
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { columnsAndRowsFormatting, TableSkeleton } = useDataGridTable()
  const { toastHandler } = useMessageHandler()
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [apiDownloadRequestState, setApiDownloadRequestState] = useState(REQUEST_STATE_IDLE)
  const [isMonthReport, setIsMonthReport] = useState<boolean>(false)
  const [monthReportList, setMonthReportList] = useState<{data_file: object[], list: object[]}>({ data_file: [], list: [] })
  const [rows, setRows] = useState([{}])
  const initPageSize = 25
  const initNowDate = `${moment().format('MM-YYYY')}`

  useEffect(() => {
    handleGetMonthReport()
  }, [])

  function handleGetMonthReport () {
    setApiRequestState(REQUEST_STATE_LOADING)
    StatementReport({ selectMonth: initNowDate })
      .then((result) => {
        setMonthReportList(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
    GetMonthReportState()
      .then((result) => {
        setIsMonthReport(result.data.close_month)
      })
  }

  function handleDownloadReports () {
    const body = {
      select_month: initNowDate,
      data_file: monthReportList.data_file
    }
    setApiDownloadRequestState(REQUEST_STATE_LOADING)
    DownloadStatementReport({ body })
      .then(() => {
        toastHandler({ message: 'Archivo descargado', type: 'success' })
        setApiDownloadRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiDownloadRequestState(REQUEST_STATE_ERROR)
        toastHandler({ message: 'Ocurrió un error al intentar descargar el archivo, inténtalo nuevamente más tarde.', type: 'error' })
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: MonthReportColumns, rows: monthReportList.list, identifier: 'store_number' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [monthReportList])

  return (
    <Main>
      <ComponentWatcher requestState={apiRequestState}>
        {{
          ComponentWatcherSuccess: (
            <BoxShadow>
              <DataGridTable
                title={`Statement Report ${initNowDate}`}
                subtitle='Reporte del mes'
                columns={MonthReportColumns}
                rows={rows}
                initPageSize={initPageSize}
                columnsNotVisible={MonthReportColumnsNotVisible}
                sortModel={[{ field: 'date_created', sort: 'desc' }]}
                CustomButtons={
                  <>
                    <LoadingButton startIcon={<FileDownloadIcon />} loading={apiDownloadRequestState === REQUEST_STATE_LOADING} key='Download' onClick={handleDownloadReports}>
                      Download
                    </LoadingButton>
                    {!isMonthReport && (
                      <LoadingButton startIcon={<PaidOutlinedIcon />} loading={apiDownloadRequestState === REQUEST_STATE_LOADING} key='GenerateReport' onClick={handleDownloadReports}>
                        Generar Reporte
                      </LoadingButton>
                    )}
                  </>
                }
              />
            </BoxShadow>
          ),
          ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
          ComponentWatcherError: <ButtonRetry onClick={() => handleGetMonthReport()} />
        }}
      </ComponentWatcher>
    </Main>
  )
}
