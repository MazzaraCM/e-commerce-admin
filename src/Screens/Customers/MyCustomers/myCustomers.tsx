import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { useCustomer } from '../../../Hooks/Models/customers'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../Utils/const'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { MyCostumersColumns, MyCostumersColumnsNotVisible } from './TableColumns'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'

export default function MyCustomers () {
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [customerList, setCustomerList] = useState([])
  const [rows, setRows] = useState([{}])
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { ListMyCustomers } = useCustomer()
  const { columnsAndRowsFormatting, TableSkeleton, getRowsSelected } = useDataGridTable()
  const initPageSize = 25

  useEffect(() => {
    handleGetCustomers()
  }, [])

  function handleGetCustomers () {
    ListMyCustomers({})
      .then((result) => {
        setCustomerList(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: MyCostumersColumns, rows: customerList, identifier: 'shopify_id' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [customerList])

  const handleSelectionChange = (selectedRowsIds) => {
    const selectedRows = getRowsSelected({ rows, ids: selectedRowsIds })
    console.log(selectedRows)
  }

  return (
    <Main>
      <ComponentWatcher requestState={apiRequestState}>
        {{
          ComponentWatcherSuccess: (
            <BoxShadow>
              <DataGridTable
                title='My Customers'
                subtitle='Lista de todos tus clientes'
                columns={MyCostumersColumns}
                rows={rows}
                onSelectionChange={(selection) => handleSelectionChange(selection)}
                initPageSize={initPageSize}
                columnsNotVisible={MyCostumersColumnsNotVisible}
                sortModel={[{ field: 'date_created', sort: 'desc' }]}
              />
            </BoxShadow>
          ),
          ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
          ComponentWatcherError: <ButtonRetry onClick={() => handleGetCustomers()} />
        }}
      </ComponentWatcher>
    </Main>
  )
}
