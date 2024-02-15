import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import Typography from '@mui/material/Typography'

const TypographyRender = ({ value, isNegative = false, isCero = true, fontWeight = 400 }) => {
  return (
    <Typography variant='h6' fontWeight={fontWeight} fontSize={14} fontFamily='Montserrat, sans-serif' sx={{ color: isNegative ? 'rgb(211, 47, 47)' : isCero ? '' : 'rgb(56, 142, 60)' }}>
      {value}
    </Typography>
  )
}

export const OrdersAndRefundColumns: GridColDef[] = [
  {
    field: 'title',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false
  },
  {
    field: 'orders_sales',
    type: 'string',
    headerName: 'Orders',
    flex: 1,
    sortable: false,
    renderCell (params) {
      const isNegative = params.value?.split('$')[0] === '-'
      const isCero = params.value?.split('$')[1] === '0.00'
      return (
        <TypographyRender value={params.value} isNegative={isNegative} isCero={isCero} />
      )
    }
  },
  {
    field: 'refunds',
    type: 'string',
    headerName: 'Refunds',
    flex: 1,
    sortable: false,
    renderCell (params) {
      const isNegative = params.value?.split('$')[0] === '-'
      const isCero = params.value?.split('$')[1] === '0.00'
      return (
        <TypographyRender value={params.value} isNegative={isNegative} isCero={isCero} />
      )
    }
  },
  {
    field: 'returns',
    type: 'string',
    headerName: 'Returns',
    flex: 1,
    sortable: false,
    renderCell (params) {
      const isNegative = params.value?.split('$')[0] === '-'
      const isCero = params.value?.split('$')[1] === '0.00'
      return (
        <TypographyRender value={params.value} isNegative={isNegative} isCero={isCero} />
      )
    }
  }
]

export const TotalColumns: GridColDef[] = [
  {
    field: 'title',
    type: 'string',
    headerName: '',
    flex: 1,
    sortable: false,
    renderCell (params) {
      return (
        <TypographyRender value={params.value} fontWeight={params.id === 'Closing Balance' ? 600 : 400} />
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
      const isNegative = params.value?.split('$')[0] === '-'
      const isCero = params.value?.split('$')[1] === '0.00'
      return (
        <TypographyRender value={params.value} isNegative={isNegative} isCero={isCero} fontWeight={params.id === 'Closing Balance' ? 600 : 400} />
      )
    }
  }
]

export const ReferralListColumns: GridColDef[] = [
  {
    field: 'store_name',
    type: 'string',
    headerName: 'Store Name',
    flex: 1
  },
  {
    field: 'referral_commission',
    type: 'string',
    headerName: 'Referral Commission',
    flex: 1,
    valueGetter (params) {
      return params.value.format
    }
  }
]

export const StatementColumnsNotVisible = {
}
