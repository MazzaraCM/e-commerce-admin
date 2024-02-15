import React from 'react'
import { GridColDef } from '@mui/x-data-grid'

import Chip from '@mui/material/Chip'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export const MonthReportColumns: GridColDef[] = [
  {
    field: 'customer_name',
    type: 'string',
    headerName: 'Customer',
    flex: 1
  },
  {
    field: 'store_name',
    type: 'string',
    headerName: 'Store Name',
    flex: 1
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    flex: 1
  },
  {
    field: 'referral_store',
    type: 'string',
    headerName: 'Referral Store',
    flex: 1
  },
  {
    field: 'average_orders',
    type: 'string',
    headerName: 'Average Monthly Sales',
    flex: 1,
    valueGetter (item) {
      return item.value.format
    }
  },
  {
    field: 'last_month_balance',
    type: 'string',
    headerName: 'Last Month Balance',
    flex: 1,
    valueGetter (item) {
      return item.value.format
    }
  },
  {
    field: 'closing_balance',
    type: 'string',
    headerName: 'Closing Balance',
    flex: 1,
    valueGetter (item) {
      return item.value.format
    }
  },
  {
    field: 'paypal_email',
    type: 'string',
    headerName: 'Paypal Email',
    flex: 1
  },
  {
    field: 'payment_month',
    headerName: 'Paid',
    flex: 0.5,
    renderCell (item) {
      if (item.value) {
        return <Chip label='Paid' color='success' icon={<CheckCircleOutlineIcon />} />
      } else {
        return <Chip label='Not Paid' color='info' icon={<InfoOutlinedIcon />} />
      }
    }
  }
]

export const MonthReportColumnsNotVisible = {
  referral_store: false
}
