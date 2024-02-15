import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { useOrders } from '../../../Hooks/Models/orders'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../Utils/const'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { MyOrderColumns, MyOrdersColumnsNotVisible } from './TableColumns'
import { Dialogs } from './dialogs'
import { DialogProvider } from './context/dialog'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { DateCalendarBasic } from '../../../Components/Common/dateCalendarBasic/DateCalendarBasic'
import moment from 'moment'

export default function MyOrders () {
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [orderList, setOrderList] = useState([])
  const [rows, setRows] = useState([{}])
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { ListOrders } = useOrders()
  const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
  const initPageSize = 25
  const initNowDate = `${moment().format('MM-YYYY')}`
  const [dateSelected, setDateSelected] = useState(initNowDate)

  useEffect(() => {
    handleGetOrders({ date: dateSelected })
  }, [dateSelected])

  function handleGetOrders ({ date }) {
    setApiRequestState(REQUEST_STATE_LOADING)
    ListOrders({ selectMonth: date })
      .then((result) => {
        setOrderList(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: MyOrderColumns, rows: orderList, identifier: 'id' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [orderList])

  const handleSelectionChange = (selectedRowsIds) => {
    const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
    console.log(selectedRows)
  }

  return (
    <DialogProvider>
      <Main>
        <ComponentWatcher requestState={apiRequestState}>
          {{
            ComponentWatcherSuccess: (
              <>
                <Dialogs />
                <BoxShadow>
                  <DataGridTable
                    title={`My Orders ${dateSelected}`}
                    subtitle='Lista de tus órdenes según la fecha seleccionada'
                    columns={MyOrderColumns}
                    rows={rows}
                    onSelectionChange={(selection) => handleSelectionChange(selection)}
                    initPageSize={initPageSize}
                    columnsNotVisible={MyOrdersColumnsNotVisible}
                    sortModel={[{ field: 'date', sort: 'desc' }]}
                    calendar
                    CalendarWidget={<DateCalendarBasic views={['month', 'year']} callback={(date) => setDateSelected(date)} callbackFormat='MM-YYYY' openTo='month' />}
                  />
                </BoxShadow>
              </>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetOrders({ date: dateSelected })} />
          }}
        </ComponentWatcher>
      </Main>
    </DialogProvider>
  )
}
