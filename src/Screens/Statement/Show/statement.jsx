import React, { useState, useEffect } from 'react'
import { useHandlerWatcher } from '../../../Hooks/handlerWatcher'
import { useStatement } from '../../../Hooks/Models/statement'
import { useStore } from '../../../Hooks/Models/store'
import { Main } from '../../../Components/Common/main/main'
import { DataGridTable } from '../../../Components/Common/dataGridTable/dataGridTable'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../Utils/const'
import { useDataGridTable } from '../../../Hooks/dataGridTable'
import { OrdersAndRefundColumns, TotalColumns, ReferralListColumns, StatementColumnsNotVisible } from './TableColumns'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { BoxShadowHeader } from '../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { DateCalendarBasic } from '../../../Components/Common/dateCalendarBasic/DateCalendarBasic'

import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import moment from 'moment'

const initPageSize = 25

const StatementSkeleton = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <BoxShadow>
          <Stack spacing={1} direction='column'>
            <Skeleton variant='rounded' height={100} />
            <Skeleton variant='rounded' height={500} />
          </Stack>
        </BoxShadow>
      </Grid>
      <Grid item xs={12} md={4}>
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

const StatementRender = ({ setDateSelected, dateSelected, calcOrdersAndRefundRowsFormatted, calcTotalRowsFormatted, statementData, apiReferralRequestState, referralListFormatted, handleGetReferralList }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <BoxShadow>
          <BoxShadowHeader
            title='Statement' subtitle='Datos sobre tus ventas según la fecha seleccionada. Haz click en la fecha para cambiarla'
            iconTitle={
              <DateCalendarBasic
                views={['month', 'year']} callback={(date) => setDateSelected(date)} callbackFormat='MM-YYYY' openTo='month' showText={false} showIcon={false}
                customText={
                  <Typography variant='h6' fontWeight={600} fontSize={18} fontFamily='Montserrat, sans-serif'>
                    {dateSelected}
                  </Typography>
                }
              />
            }
          />
          <Divider sx={{ my: 2, mb: 3 }} />
          <SalesDataSection OrdersAndRefundColumns={OrdersAndRefundColumns} calcOrdersAndRefundRowsFormatted={calcOrdersAndRefundRowsFormatted} />
          <TotalBalanceSection StatementColumnsNotVisible={StatementColumnsNotVisible} TotalColumns={TotalColumns} calcTotalRowsFormatted={calcTotalRowsFormatted} />
        </BoxShadow>
      </Grid>
      <Grid item xs={12} md={4}>
        <PaysSection statementData={statementData} />
        <ReferralListSection dateSelected={dateSelected} apiReferralRequestState={apiReferralRequestState} referralListFormatted={referralListFormatted} handleGetReferralList={handleGetReferralList} />
      </Grid>
    </Grid>
  )
}

const SalesDataSection = ({ calcOrdersAndRefundRowsFormatted }) => {
  return (
    <DataGridTable
      title='Datos de Ventas'
      subtitle='Resultado del cálculo de todas las transacciones de tu tienda en la fecha seleccionada. Esto incluye taxes, cambios, descuentos y fee'
      iconTitle={
        <Tooltip title='Algunas órdenes pueden tomar hasta 24 horas en verse reflejadas en el balance' placement='top'>
          <IconButton>
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
            }
      showPagination={false}
      columns={OrdersAndRefundColumns}
      rows={calcOrdersAndRefundRowsFormatted}
      showSearch={false}
      initPageSize={initPageSize}
      columnsNotVisible={StatementColumnsNotVisible}
      toolbarButtons={['columns', 'density', 'export']}
    />
  )
}

const TotalBalanceSection = ({ calcTotalRowsFormatted }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <DataGridTable
        title='Balance Total'
        subtitle='Cálculo total sobre tus ventas según la fecha seleccionada siguiendo los resultados de Datos de Ventas'
        iconTitle={
          <Tooltip title='Algunas órdenes pueden tomar hasta 24 horas en verse reflejadas en el balance' placement='top'>
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
                }
        showHeader={false}
        showToolbarButtons={false}
        showPagination={false}
        columns={TotalColumns}
        rows={calcTotalRowsFormatted}
        showSearch={false}
        initPageSize={initPageSize}
      />
    </Box>
  )
}

const PaysSection = ({ statementData }) => {
  return (
    <BoxShadow>
      <BoxShadowHeader title='Pagos' subtitle='Información sobre tu último pago' />
      <Box>
        {statementData.last_payment
          ? (
            <>
              <Stack direction='row' spacing={1}>
                <Typography variant='h6' fontWeight={600} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  Payment Amount:
                </Typography>
                <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  {statementData.last_payment.payment_amount}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1}>
                <Typography variant='h6' fontWeight={600} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  Payment Date:
                </Typography>
                <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  {moment(statementData.last_payment.payment_date).format('DD-MM-YYYY')}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1}>
                <Typography variant='h6' fontWeight={600} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  Payment Type:
                </Typography>
                <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  {statementData.last_payment.payment_type}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1}>
                <Typography variant='h6' fontWeight={600} fontSize={14} fontFamily='Montserrat, sans-serif' noWrap>
                  Payment Email:
                </Typography>
                <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif' noWrap>
                  {statementData.payment.paypal_email}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1} my={1} alignItems='center'>
                <Typography variant='h6' fontWeight={600} fontSize={14} fontFamily='Montserrat, sans-serif' noWrap>
                  Status:
                </Typography>
                <Chip label='Pagado' color='success' variant='outlined' />
              </Stack>
              <Typography variant='h6' fontWeight={300} fontSize={12} fontFamily='Montserrat, sans-serif'>
                Si crees que hay un error en tu pago, contácta a soporte técnico.
              </Typography>
            </>
            )
          : (
            <>
              <Stack direction='column' spacing={1}>
                <Typography variant='h6' fontWeight={600} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  Aún no has recibido el pago.
                </Typography>
                <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif'>
                  El pago se suele hacer a principios del próximo mes, si ya pasó un mes y aún no has recibido el pago, contácta a soporte técnico.
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1} mt={1} alignItems='center'>
                <Typography variant='h6' fontWeight={600} fontSize={14} fontFamily='Montserrat, sans-serif' noWrap>
                  Status:
                </Typography>
                <Chip label='Pendiente' color='warning' variant='outlined' />
              </Stack>
            </>
            )}
      </Box>
    </BoxShadow>
  )
}

const ReferralListSection = ({ dateSelected, apiReferralRequestState, referralListFormatted, handleGetReferralList }) => {
  const { TableSkeleton } = useDataGridTable()
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()

  return (
    <BoxShadow sx={{ mt: 2 }}>
      <Box>
        <ComponentWatcher requestState={apiReferralRequestState}>{{
          ComponentWatcherSuccess: (
            <DataGridTable
              title='Referral List'
              subtitle='Acá aparecerán las tiendas registradas con tu link y las ventas que han tenido'
              iconTitle={
                <Tooltip title='Si no sabes como obtener el link, ve a Perfil -> Store Settings -> Referral Link ' placement='top'>
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                </Tooltip>
                    }
              columns={ReferralListColumns}
              rows={referralListFormatted}
              initPageSize={10}
              showSearch={false}
            />
          ),
          ComponentWatcherLoading: <TableSkeleton numberOfItems={5} />,
          ComponentWatcherError: <ButtonRetry onClick={() => handleGetReferralList({ date: dateSelected })} />
        }}
        </ComponentWatcher>
      </Box>
    </BoxShadow>
  )
}

export default function Statement () {
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const { GetStatement } = useStatement()
  const { GetReferralList } = useStore()
  const { columnsAndRowsFormatting } = useDataGridTable()
  const initNowDate = `${moment().format('MM-YYYY')}`
  const [dateSelected, setDateSelected] = useState(initNowDate)
  const [apiStatementRequestState, setApiStatementRequestState] = useState(REQUEST_STATE_LOADING)
  const [apiReferralRequestState, setApiReferralRequestState] = useState(REQUEST_STATE_LOADING)
  const [statementData, setStatementData] = useState([])
  const [referralListData, setReferralListData] = useState([])
  const [calcOrdersAndRefundRowsFormatted, setCalcOrdersAndRefundRowsFormatted] = useState([{}])
  const [calcTotalRowsFormatted, setCalcTotalRowsFormatted] = useState([{}])
  const [referralListFormatted, setReferralListFormatted] = useState([{}])

  useEffect(() => {
    handleRequests({ date: dateSelected })
  }, [dateSelected])

  useEffect(() => {
    if (apiStatementRequestState === REQUEST_STATE_SUCCESS) {
      handleGetReferralList({ date: dateSelected, referralPercentage: statementData.percentages.referral_commission_percentage })
    }
  }, [apiStatementRequestState])

  async function handleRequests ({ date }) {
    await handleGetStatement({ date })
  }

  async function handleGetStatement ({ date }) {
    setApiStatementRequestState(REQUEST_STATE_LOADING)
    GetStatement({ selectMonth: date })
      .then((result) => {
        setStatementData(result.data)
        setApiStatementRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiStatementRequestState(REQUEST_STATE_ERROR)
      })
  }

  async function handleGetReferralList ({ date, referralPercentage }) {
    setApiReferralRequestState(REQUEST_STATE_LOADING)
    GetReferralList({ selectMonth: date, referralPercentage })
      .then((result) => {
        setReferralListData(result.data)
        setApiReferralRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiReferralRequestState(REQUEST_STATE_ERROR)
      })
  }

  const calcOrdersAndRefundRows = [
    { title: 'Product Charges', orders_sales: statementData?.details?.orders?.total_orders.format, refunds: statementData?.details?.refunds?.total_orders.format, returns: statementData?.details?.returns?.total_orders.format },
    { title: 'Discount for Changes', orders_sales: statementData?.details?.orders?.total_discount_changes.format, refunds: statementData?.details?.refunds?.total_discount_changes.format, returns: statementData?.details?.returns?.total_discount_changes.format },
    { title: 'Shipping and Taxes', orders_sales: statementData?.details?.orders?.other_charges.format, refunds: statementData?.details?.refunds?.other_charges.format, returns: statementData?.details?.returns?.other_charges.format },
    { title: 'Products Fee', orders_sales: statementData?.details?.orders?.fee_orders.format, refunds: statementData?.details?.refunds?.fee_orders.format, returns: statementData?.details?.returns?.fee_orders.format },
    { title: 'Discounts of Store', orders_sales: statementData?.details?.orders?.total_discounts.format, refunds: statementData?.details?.refunds?.total_discounts.format, returns: statementData?.details?.returns?.total_discounts.format }
  ]

  const calcTotalRows = [
    { title: 'Subtotal', value: statementData?.details?.general?.subtotal.format },
    { title: 'Store Fee', value: statementData?.details?.general?.store_fee.format },
    // { title: 'Referrals Commission', value: '$174.85' },
    { title: 'Last Month Balance', value: statementData?.details?.general?.last_month_balance.format },
    { title: 'Store Adjustment', value: statementData?.details?.general?.store_adjustment.format },
    { title: 'Closing Balance', value: statementData?.details?.general?.closing_balance.format }
  ]

  useEffect(() => {
    const formattingOrdersAndRefund = columnsAndRowsFormatting({ columns: OrdersAndRefundColumns, rows: calcOrdersAndRefundRows, identifier: 'title' })
    const { formattedRows: formattedOrdersAndRefund } = formattingOrdersAndRefund
    setCalcOrdersAndRefundRowsFormatted(formattedOrdersAndRefund)

    const formattingTotal = columnsAndRowsFormatting({ columns: TotalColumns, rows: calcTotalRows, identifier: 'title' })
    const { formattedRows: formattedTotal } = formattingTotal
    setCalcTotalRowsFormatted(formattedTotal)
  }, [statementData])

  useEffect(() => {
    const formattingReferrals = columnsAndRowsFormatting({ columns: ReferralListColumns, rows: referralListData, identifier: 'store_name' })
    const { formattedRows: formattedReferrals } = formattingReferrals
    setReferralListFormatted(formattedReferrals)
  }, [referralListData])

  return (
    <Main>
      <ComponentWatcher requestState={apiStatementRequestState}>{{
        ComponentWatcherSuccess: <StatementRender referralListFormatted={referralListFormatted} handleGetReferralList={handleGetReferralList} apiReferralRequestState={apiReferralRequestState} calcOrdersAndRefundRowsFormatted={calcOrdersAndRefundRowsFormatted} calcTotalRowsFormatted={calcTotalRowsFormatted} dateSelected={dateSelected} setDateSelected={setDateSelected} statementData={statementData} />,
        ComponentWatcherLoading: <StatementSkeleton />,
        ComponentWatcherError: <ButtonRetry onClick={() => handleGetStatement({ date: dateSelected })} />
      }}
      </ComponentWatcher>
    </Main>
  )
}
