import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { useCustomer } from '../../../Hooks/Models/customers'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../Utils/const'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { AllCostumersColumns, AllCostumersColumnsNotVisible } from './TableColumns'
import { Dialogs } from './dialogs'
import { DialogProvider } from './context/dialog'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'

export default function AllCustomers () {
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [customerList, setCustomerList] = useState([])
  const [rows, setRows] = useState([{}])
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { ListCustomers } = useCustomer()
  const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
  const initPageSize = 25

  useEffect(() => {
    handleGetCustomers()
  }, [])

  function handleGetCustomers () {
    ListCustomers()
      .then((result) => {
        setCustomerList(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: AllCostumersColumns, rows: customerList, identifier: '_id' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [customerList])

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
                    title='All Customers'
                    subtitle='Lista de todos los clientes'
                    columns={AllCostumersColumns}
                    rows={rows}
                    onSelectionChange={(selection) => handleSelectionChange(selection)}
                    initPageSize={initPageSize}
                    columnsNotVisible={AllCostumersColumnsNotVisible}
                    sortModel={[{ field: 'date_created', sort: 'desc' }]}
                  />
                </BoxShadow>
              </>
            ),
            ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
            ComponentWatcherError: <ButtonRetry onClick={() => handleGetCustomers()} />
          }}
        </ComponentWatcher>
      </Main>
    </DialogProvider>
  )
}
