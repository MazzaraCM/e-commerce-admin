import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../Utils/const'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { AllDiscountsColumns, AllDiscountsColumnsNotVisible } from './TableColumns'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { useDiscounts } from '../../../Hooks/Models/discounts'

export default function AllDiscounts () {
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { ListAllDiscounts } = useDiscounts()
  const { columnsAndRowsFormatting, TableSkeleton } = useDataGridTable()
  const [discountList, setDiscountList] = useState<object[]>([])
  const [rows, setRows] = useState([{}])
  const initPageSize = 25

  useEffect(() => {
    handleGetAllDiscounts()
  }, [])

  function handleGetAllDiscounts () {
    setApiRequestState(REQUEST_STATE_LOADING)

    ListAllDiscounts()
      .then((result) => {
        console.log(result.data)
        setDiscountList(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: AllDiscountsColumns, rows: discountList, identifier: '_id' })
    const { formattedRows } = formattingResult
    setRows(formattedRows)
  }, [discountList])

  return (
    <Main>
      <ComponentWatcher requestState={apiRequestState}>
        {{
          ComponentWatcherSuccess: (
            <BoxShadow>
              <DataGridTable
                title='All Discount List'
                subtitle='Lista de todos los descuentos'
                columns={AllDiscountsColumns}
                rows={rows}
                initPageSize={initPageSize}
                columnsNotVisible={AllDiscountsColumnsNotVisible}
                sortModel={[{ field: 'date_created', sort: 'desc' }]}
              />
            </BoxShadow>
          ),
          ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
          ComponentWatcherError: <ButtonRetry onClick={() => handleGetAllDiscounts()} />
        }}
      </ComponentWatcher>
    </Main>
  )
}
