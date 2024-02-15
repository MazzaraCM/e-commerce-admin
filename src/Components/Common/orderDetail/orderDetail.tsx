import React, { useEffect, useState } from 'react'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { OrderStatusColumns, ShippingColumns, BalanceColumns, ItemsColumns, ShippingInformationColumns } from './TableColumns'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { BoxShadowHeader } from '../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { useOrders } from '../../../Hooks/Models/orders'
import { useParams } from 'react-router-dom'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../Utils/const'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

type dataOrderDetail = {
    customer_name: string,
    data_order : object,
    date: string,
    fulfillment: string,
    id: number,
    name: string,
    total_discounts: string,
    total_items: number,
    total_order: string,
}

const OrderSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <BoxShadow>
          <Stack spacing={1} direction='column'>
            <Skeleton variant='rounded' height={100} />
            <Skeleton variant='rounded' height={300} />
          </Stack>
        </BoxShadow>
      </Grid>
      <Grid item xs={4}>
        <BoxShadow>
          <Stack spacing={1} direction='column'>
            <Skeleton variant='rounded' height={100} />
            <Skeleton variant='rounded' height={300} />
          </Stack>
        </BoxShadow>
      </Grid>
      <Grid item xs={4}>
        <BoxShadow>
          <Stack spacing={1} direction='column'>
            <Skeleton variant='rounded' height={100} />
            <Skeleton variant='rounded' height={300} />
          </Stack>
        </BoxShadow>
      </Grid>
      <Grid item xs={12}>
        <BoxShadow>
          <Stack spacing={1} direction='column'>
            <Skeleton variant='rounded' height={100} />
            <Skeleton variant='rounded' height={300} />
          </Stack>
        </BoxShadow>
      </Grid>
      <Grid item xs={6}>
        <BoxShadow>
          <Stack spacing={1} direction='column'>
            <Skeleton variant='rounded' height={100} />
            <Skeleton variant='rounded' height={300} />
          </Stack>
        </BoxShadow>
      </Grid>
      <Grid item xs={6}>
        <BoxShadow>
          <Stack spacing={1} direction='column'>
            <Skeleton variant='rounded' height={100} />
            <Skeleton variant='rounded' height={300} />
          </Stack>
        </BoxShadow>
      </Grid>
    </Grid>
  )
}

export function OrderDetail ({ data: fromData, method = 'local' }: {data: dataOrderDetail, method?: 'local' | 'api'}) {
  const { GetOrder } = useOrders()
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const urlParams = useParams()
  const { columnsAndRowsFormatting } = useDataGridTable()
  const [apiRequestState, setApiRequestState] = useState(method === 'local' ? REQUEST_STATE_SUCCESS : REQUEST_STATE_LOADING)
  const [orderStatusRowsFormatted, setOrderStatusRowsFormatted] = useState([{}])
  const [shippingRowsFormatted, setShippingRowsFormatted] = useState([{}])
  const [balanceRowsFormatted, setBalanceRowsFormatted] = useState([{}])
  const [itemsRowsFormatted, setItemsRowsFormatted] = useState([{}])
  const [shippingInformationRowsFormatted, setShippingInformationRowsFormatted] = useState([{}])
  const [data, setData] = useState(fromData)

  useEffect(() => {
    if (method === 'api') {
      getOrder()
    }
  }, [])

  function getOrder () {
    GetOrder({ orderName: urlParams.order_name ?? '' })
      .then((response) => {
        console.log(response.data)
        setData(response.data)
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  const totalShippingPrice = data?.data_order?.shipping_lines.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.price)
  }, 0)

  const orderStatusRows = [
    { title: 'Payment', value: data?.data_order },
    { title: 'Shipping', value: data?.data_order }
  ]

  const ShippingRows = [
    { title: 'Tracking Number', value: data?.data_order?.shipping_lines[0].carrier_identifier },
    { title: 'Name', value: `${data?.data_order?.customer.first_name} ${data?.data_order?.customer.last_name}` },
    { title: 'Email', value: data?.data_order?.customer.email },
    { title: 'Phone Number', value: data?.data_order?.customer.phone },
    { title: 'Type', value: data?.data_order?.shipping_lines[0].title }
  ]

  const balanceRows = [
    { title: 'Subtotal', value: data?.data_order?.subtotal_price },
    { title: 'Discounts', value: data?.data_order?.total_discounts },
    { title: 'Taxes', value: data?.data_order?.total_tax },
    { title: 'Shipping', value: totalShippingPrice },
    { title: 'Total Order', value: data?.total_order }
  ]

  const ShippingInformationRows = [
    { title: 'First Name', value: data?.data_order?.billing_address.first_name },
    { title: 'Last Name', value: data?.data_order?.billing_address.last_name },
    { title: 'Company', value: data?.data_order?.billing_address.company },
    { title: 'Phone Number', value: data?.data_order?.billing_address.phone },
    { title: 'Address', value: data?.data_order?.billing_address.address1 },
    { title: 'Apartment (optional)', value: data?.data_order?.billing_address.address2 },
    { title: 'Country/Region', value: data?.data_order?.billing_address.country },
    { title: 'City', value: data?.data_order?.billing_address.city },
    { title: 'Province', value: data?.data_order?.billing_address.province },
    { title: 'ZIP/Postal Code', value: data?.data_order?.billing_address.zip }
  ]

  useEffect(() => {
    if (apiRequestState === REQUEST_STATE_SUCCESS) {
      const formattingOrderStatus = columnsAndRowsFormatting({ columns: OrderStatusColumns, rows: orderStatusRows, identifier: 'title' })
      const { formattedRows: formattedOrderStatus } = formattingOrderStatus
      setOrderStatusRowsFormatted(formattedOrderStatus)

      const formattingShipping = columnsAndRowsFormatting({ columns: ShippingColumns, rows: ShippingRows, identifier: 'title' })
      const { formattedRows: formattedShipping } = formattingShipping
      setShippingRowsFormatted(formattedShipping)

      const formattingTotal = columnsAndRowsFormatting({ columns: BalanceColumns, rows: balanceRows, identifier: 'title' })
      const { formattedRows: formattedTotal } = formattingTotal
      setBalanceRowsFormatted(formattedTotal)

      const formattingItems = columnsAndRowsFormatting({ columns: ItemsColumns, rows: data.data_order.line_items, identifier: 'id' })
      const { formattedRows: formattedIitems } = formattingItems
      setItemsRowsFormatted(formattedIitems)

      const formattingShippingInformation = columnsAndRowsFormatting({ columns: ShippingInformationColumns, rows: ShippingInformationRows, identifier: 'title' })
      const { formattedRows: formattedShippingInformation } = formattingShippingInformation
      setShippingInformationRowsFormatted(formattedShippingInformation)
    }
  }, [apiRequestState])

  return (
    <ComponentWatcher requestState={apiRequestState}>
      {{
        ComponentWatcherSuccess:
            apiRequestState === REQUEST_STATE_SUCCESS && (
              <Grid container spacing={2} sx={{ maxWidth: '1024px', margin: 'auto' }}>
                <Grid item xs={4}>
                  <BoxShadow sx={{ height: '100%' }}>
                    <DataGridTable
                      title='Order Status'
                      subtitle='Estatus sobre la orden'
                      showHeader={false}
                      showToolbarButtons={false}
                      showPagination={false}
                      columns={OrderStatusColumns}
                      rows={orderStatusRowsFormatted}
                      showSearch={false}
                    />
                  </BoxShadow>
                </Grid>
                <Grid item xs={4}>
                  <BoxShadow sx={{ height: '100%' }}>
                    <Box sx={{ mt: 2 }}>
                      <DataGridTable
                        title='Tracking Information'
                        subtitle='Información sobre el envío de la orden'
                        showHeader={false}
                        showToolbarButtons={false}
                        showPagination={false}
                        showSearch={false}
                        columns={ShippingColumns}
                        rows={shippingRowsFormatted}
                      />
                    </Box>
                  </BoxShadow>
                </Grid>
                <Grid item xs={4}>
                  <BoxShadow sx={{ height: '100%' }}>
                    <Box sx={{ mt: 2 }}>
                      <DataGridTable
                        title='Balance'
                        subtitle='Cálculo del balance total de la orden'
                        showHeader={false}
                        showToolbarButtons={false}
                        showPagination={false}
                        columns={BalanceColumns}
                        rows={balanceRowsFormatted}
                        showSearch={false}
                      />
                    </Box>
                  </BoxShadow>
                </Grid>
                <Grid item xs={12}>
                  <BoxShadow>
                    <Box sx={{ mt: 2 }}>
                      <DataGridTable
                        title='List Products'
                        subtitle='Lista de los productos con información básica'
                        columns={ItemsColumns}
                        rows={itemsRowsFormatted}
                      />
                    </Box>
                  </BoxShadow>
                </Grid>
                <Grid item xs={6}>
                  <BoxShadow sx={{ height: '100%' }}>
                    <Box sx={{ mt: 2 }}>
                      <DataGridTable
                        title='Address Information'
                        subtitle='Información sobre el destino de los productos, ésta se basa en la información suministrada previamente. Si necesitas modifiicarla o crees que hay un error, contácta a soporte técnico.'
                        columns={ShippingInformationColumns}
                        rows={shippingInformationRowsFormatted}
                        initPageSize={10}
                        showHeader={false}
                        showToolbarButtons={false}
                        showPagination={false}
                        showSearch={false}
                      />
                    </Box>
                  </BoxShadow>
                </Grid>
                <Grid item xs={6}>
                  <BoxShadow sx={{ height: '100%' }}>
                    <Box sx={{ mt: 2, pb: 2, height: '100%' }}>
                      <BoxShadowHeader title='Shipping Notes' subtitle='Notas suministradas para que el servicio de shipping tenga en cuenta al momento de la entrega' />
                      <TextField
                        id='outlined-textarea'
                        multiline
                        maxRows={4}
                        sx={{ height: '80%', width: '100%', '& .MuiInputBase-root': { m: 1, height: '100%' } }}
                        value={data?.data_order?.note ?? ''}
                        disabled
                      />
                    </Box>
                  </BoxShadow>
                </Grid>
              </Grid>
            ),
        ComponentWatcherLoading: <OrderSkeleton />,
        ComponentWatcherError: <ButtonRetry onClick={() => getOrder()} />
      }}
    </ComponentWatcher>
  )
}
