import React from 'react'
import { GridColDef, GridRowId } from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const TypographyRender = ({ value, isGreatedThanCero = false, fontWeight = 400, isHeader = false, header }: {value: string | number, isGreatedThanCero?: boolean, fontWeight: number, isHeader?: boolean, header?: GridRowId }) => {
  const green = 'rgb(56, 142, 60)'
  const red = 'rgb(211, 47, 47)'
  let color = ''

  if (isHeader) {
    color = ''
  } else {
    switch (header) {
      case 'Subtotal':
        color = isGreatedThanCero ? green : ''
        break
      case 'Discounts':
      case 'Taxes':
      case 'Shipping':
        color = isGreatedThanCero ? red : ''
        break
      default:
        color = ''
    }
  }

  return (
    <Typography
      variant='h6' fontWeight={fontWeight} fontSize={14} fontFamily='Montserrat, sans-serif' sx={{ color }}
    >
      {value}
    </Typography>
  )
}

export const OrderStatusColumns: GridColDef[] = [
  {
    field: 'title',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false
  },
  {
    field: 'value',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false,
    renderCell (item) {
      const paymentStatus = item.value
      const paymentStatusColor = paymentStatus.financial_status === 'paid' ? 'success' : paymentStatus.financial_status === 'refunded' ? 'warning' : 'info'
      const paymentStatusIcon = paymentStatus.financial_status === 'paid' ? <CheckCircleOutlineIcon /> : paymentStatus.financial_status === 'refunded' ? <ReplayOutlinedIcon /> : <InfoOutlinedIcon />
      const shippingStatusColor = item.value.fulfillments[0] ? item.value.fulfillments[0].status === 'success' ? 'success' : item.value.fulfillments[0].status === 'refunded' ? 'warning' : 'info' : 'warning'
      const shippingStatusIcon = item.value.fulfillments[0] ? item.value.fulfillments[0].status === 'success' ? <CheckCircleOutlineIcon /> : item.value.fulfillments[0].status === 'refunded' ? <ReplayOutlinedIcon /> : <InfoOutlinedIcon /> : <ReplayOutlinedIcon />

      if (item.value.cancelled_at) {
        return <Chip label='Cancelled' color='error' icon={<CancelOutlinedIcon />} />
      } else {
        if (item.row.id === 'Payment') {
          return <Chip label={paymentStatus.financial_status} color={paymentStatusColor} icon={paymentStatusIcon} sx={{ textTransform: 'capitalize' }} />
        } else if (item.row.id === 'Shipping') {
          return <Chip label={item.value.fulfillments[0].shipment_status} color={shippingStatusColor} icon={shippingStatusIcon} sx={{ textTransform: 'capitalize' }} />
        }
        return ''
      }
    }
  }
]

export const ShippingColumns: GridColDef[] = [
  {
    field: 'title',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false
  },
  {
    field: 'value',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false
  }
]

export const BalanceColumns: GridColDef[] = [
  {
    field: 'title',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false,
    renderCell (params) {
      return (
        <TypographyRender isHeader value={params.value} fontWeight={params.id === 'Total Order' ? 600 : 400} />
      )
    }
  },
  {
    field: 'value',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false,
    renderCell (params) {
      const isGreatedThanCero = parseInt(params.value) > 0
      return (
        <TypographyRender value={params.value} isGreatedThanCero={isGreatedThanCero} header={params.id} fontWeight={params.id === 'Total Order' ? 600 : 400} />
      )
    }
  }
]

export const ItemsColumns: GridColDef[] = [
  {
    field: 'index',
    type: 'string',
    headerName: 'Item',
    flex: 0.4
  },
  {
    field: 'title',
    type: 'string',
    headerName: 'Title',
    flex: 1
  },
  {
    field: 'sku',
    type: 'string',
    headerName: 'SKU',
    flex: 1
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Price',
    flex: 0.5,
    valueFormatter ({ value }) {
      return `$${value}`
    }
  },
  {
    field: 'total_tax',
    type: 'string',
    headerName: 'Total Taxes',
    flex: 0.5,
    valueFormatter ({ value }) {
      return `$${value}`
    }
  },
  {
    field: 'subtotal',
    type: 'string',
    headerName: 'Subtotal',
    flex: 0.5,
    valueGetter (params) {
      return `$${parseFloat(params.row.price) + parseFloat(params.row.total_tax)}`
    }
  },
  {
    field: 'quantity',
    type: 'string',
    headerName: 'Quantity',
    flex: 0.5
  },
  {
    field: 'total',
    type: 'string',
    headerName: 'Total',
    flex: 0.5,
    valueGetter (params) {
      return `$${(parseFloat(params.row.price) + parseFloat(params.row.total_tax)) * parseFloat(params.row.quantity)}`
    }
  }
]

export const ShippingInformationColumns: GridColDef[] = [
  {
    field: 'title',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false
  },
  {
    field: 'value',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false
  }
]
