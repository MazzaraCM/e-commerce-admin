import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../Utils/const'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { AllDiscountsColumns, AllDiscountsColumnsNotVisible } from './TableColumns'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { useCustomer } from '../../../Hooks/Models/customers'

export default function ContactForm () {
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { GetContactForm } = useCustomer()
  const { columnsAndRowsFormatting, TableSkeleton } = useDataGridTable()
  const [ordersTransactions, setOrdersTransactions] = useState<object[]>([])
  const [rows, setRows] = useState([{}])
  const initPageSize = 25

  useEffect(() => {
    handleGetContactForm()
  }, [])

  function handleGetContactForm () {
    setApiRequestState(REQUEST_STATE_LOADING)

    GetContactForm()
      .then((result) => {
        console.log(result.data)
        setOrdersTransactions(result.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  useEffect(() => {
    const formattingResult = columnsAndRowsFormatting({ columns: AllDiscountsColumns, rows: ordersTransactions, identifier: '_id' })
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
                title='Contact Form'
                subtitle='Lista de las solicitudes de contacto enviados a través de la página'
                columns={AllDiscountsColumns}
                rows={rows}
                initPageSize={initPageSize}
                columnsNotVisible={AllDiscountsColumnsNotVisible}
                sortModel={[{ field: 'date_created', sort: 'desc' }]}
              />
            </BoxShadow>
          ),
          ComponentWatcherLoading: <TableSkeleton numberOfItems={initPageSize} />,
          ComponentWatcherError: <ButtonRetry onClick={() => handleGetContactForm()} />
        }}
      </ComponentWatcher>
    </Main>
  )
}
