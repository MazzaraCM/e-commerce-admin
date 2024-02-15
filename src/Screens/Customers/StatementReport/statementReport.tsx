import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../../../Utils/const'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { ReportsColumns, ReportsColumnsNotVisible } from './TableColumns'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { DateCalendarBasic } from '../../../Components/Common/dateCalendarBasic/DateCalendarBasic'
import { useCustomer } from '../../../Hooks/Models/customers'
import { useMessageHandler } from '../../../Hooks/handlerMessages'
import moment from 'moment'

import LoadingButton from '@mui/lab/LoadingButton'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'

export default function StatementReport () {
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [apiDownloadRequestState, setApiDownloadRequestState] = useState(REQUEST_STATE_IDLE)
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { StatementReport, DownloadStatementReport } = useCustomer()
  const { columnsAndRowsFormatting, TableSkeleton } = useDataGridTable()
  const { toastHandler } = useMessageHandler()
  const [reportsList, setReportsList] = useState<{data_file: object[], list: object[]}>({ data_file: [], list: [] })
  const [rows, setRows] = useState([{}])
  const initPageSize = 25
  const initNowDate = `${moment().format('MM-YYYY')}`
  const [dateSelected, setDateSelected] = useState(initNowDate)

  useEffect(() => {
    handleGetReports({ date: dateSelected })
  }, [dateSelected])

  function handleGetReports ({ date }) {
    setApiRequestState(REQUEST_STATE_LOADING)

    StatementReport({ selectMonth: date })
      .then((result) => {
        setReportsList(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }
  function handleDownloadReports () {
    const body = {
      select_month: dateSelected,
      data_file: reportsList.data_file
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
    const formattingResult = columnsAndRowsFormatting({ columns: ReportsColumns, rows: reportsList.list, identifier: 'store_number' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [reportsList])

  return (
    <Main>
      <ComponentWatcher requestState={apiRequestState}>
        {{
          ComponentWatcherSuccess: (
            <BoxShadow>
              <DataGridTable
                title={`Statement Report ${dateSelected}`}
                subtitle='Reporte del mes según la fecha seleccionada'
                columns={ReportsColumns}
                rows={rows}
                initPageSize={initPageSize}
                columnsNotVisible={ReportsColumnsNotVisible}
                sortModel={[{ field: 'date_created', sort: 'desc' }]}
                calendar
                CalendarWidget={<DateCalendarBasic views={['month', 'year']} callback={(date) => setDateSelected(date)} callbackFormat='MM-YYYY' openTo='month' />}
                CustomButtons={
                  <>
                    <LoadingButton startIcon={<FileDownloadIcon />} loading={apiDownloadRequestState === REQUEST_STATE_LOADING} key='Download' onClick={handleDownloadReports}>
                      Download
                    </LoadingButton>
                    <LoadingButton startIcon={<PaidOutlinedIcon />} loading={apiDownloadRequestState === REQUEST_STATE_LOADING} key='Pay' onClick={handleDownloadReports}>
                      Pay
                    </LoadingButton>
                  </>
                }
              />
            </BoxShadow>
          ),
          ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
          ComponentWatcherError: <ButtonRetry onClick={() => handleGetReports({ date: dateSelected })} />
        }}
      </ComponentWatcher>
    </Main>
  )
}
