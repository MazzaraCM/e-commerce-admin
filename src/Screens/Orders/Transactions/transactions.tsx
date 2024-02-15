import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR, REQUEST_STATE_IDLE } from '../../../Utils/const'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { Columns, ColumnsNotVisible } from './TableColumns'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { DateCalendarBasic } from '../../../Components/Common/dateCalendarBasic/DateCalendarBasic'
import { useOrders } from '../../../Hooks/Models/orders'
import { useMessageHandler } from '../../../Hooks/handlerMessages'
import moment from 'moment'

import LoadingButton from '@mui/lab/LoadingButton'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

export default function OrdersTransactions () {
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [apiDownloadRequestState, setApiDownloadRequestState] = useState(REQUEST_STATE_IDLE)
  const [ordersTransactions, setOrdersTransactions] = useState<{data_file: object[], list: object[]}>({ data_file: [], list: [] })
  const [rows, setRows] = useState([{}])
  const { toastHandler } = useMessageHandler()
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { ListOrdersTransactions, DownloadTransactions } = useOrders()
  const { columnsAndRowsFormatting, TableSkeleton } = useDataGridTable()
  const initNowDate = `${moment().format('MM-YYYY')}`
  const [dateSelected, setDateSelected] = useState(initNowDate)
  const initPageSize = 25

  useEffect(() => {
    handleGetOrderTransactions({ date: dateSelected })
  }, [dateSelected])

  function handleGetOrderTransactions ({ date }) {
    setApiRequestState(REQUEST_STATE_LOADING)

    ListOrdersTransactions({ selectMonth: date })
      .then((result) => {
        console.log(result.data)
        setOrdersTransactions(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }
  function handleDownloadTransactions () {
    const body = {
      select_month: dateSelected,
      data_file: ordersTransactions.data_file
    }
    setApiDownloadRequestState(REQUEST_STATE_LOADING)
    DownloadTransactions({ body })
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
    const formattingResult = columnsAndRowsFormatting({ columns: Columns, rows: ordersTransactions.list, identifier: 'order_name' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [ordersTransactions])

  return (
    <Main>
      <ComponentWatcher requestState={apiRequestState}>
        {{
          ComponentWatcherSuccess: (
            <BoxShadow>
              <DataGridTable
                title='Order Transactions'
                subtitle='Lista las transacciones de cada orden'
                columns={Columns}
                rows={rows}
                initPageSize={initPageSize}
                columnsNotVisible={ColumnsNotVisible}
                sortModel={[{ field: 'date_created', sort: 'desc' }]}
                calendar
                CalendarWidget={<DateCalendarBasic views={['month', 'year']} callback={(date) => setDateSelected(date)} callbackFormat='MM-YYYY' openTo='month' />}
                CustomButtons={
                  <LoadingButton startIcon={<FileDownloadIcon />} loading={apiDownloadRequestState === REQUEST_STATE_LOADING} key='Download' onClick={handleDownloadTransactions}>
                    Download
                  </LoadingButton>
                }
              />
            </BoxShadow>
          ),
          ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
          ComponentWatcherError: <ButtonRetry onClick={() => handleGetOrderTransactions({ date: dateSelected })} />
        }}
      </ComponentWatcher>
    </Main>
  )
}
