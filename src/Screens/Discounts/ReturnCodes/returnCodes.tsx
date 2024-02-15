import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../Utils/const'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { Columns, ColumnsNotVisible } from './TableColumns'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { useDiscounts } from '../../../Hooks/Models/discounts'

export default function ReturnCodes () {
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { ListReturnCodes } = useDiscounts()
  const { columnsAndRowsFormatting, TableSkeleton } = useDataGridTable()
  const [returnCodes, setReturnCodes] = useState<object[]>([])
  const [rows, setRows] = useState([{}])
  const initPageSize = 25

  useEffect(() => {
    handleGetReturnCodes()
  }, [])

  function handleGetReturnCodes () {
    setApiRequestState(REQUEST_STATE_LOADING)

    ListReturnCodes()
      .then((result) => {
        console.log(result.data)
        setReturnCodes(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: Columns, rows: returnCodes, identifier: '_id' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [returnCodes])

  return (
    <Main>
      <ComponentWatcher requestState={apiRequestState}>
        {{
          ComponentWatcherSuccess: (
            <BoxShadow>
              <DataGridTable
                title='Return Codes'
                subtitle='Lista de los cupones de retorno'
                columns={Columns}
                rows={rows}
                initPageSize={initPageSize}
                columnsNotVisible={ColumnsNotVisible}
                sortModel={[{ field: 'date_created', sort: 'desc' }]}
              />
            </BoxShadow>
          ),
          ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
          ComponentWatcherError: <ButtonRetry onClick={() => handleGetReturnCodes()} />
        }}
      </ComponentWatcher>
    </Main>
  )
}
