import React from 'react'
import { GridColDef } from '@mui/x-data-grid'

import Chip from '@mui/material/Chip'

export const Columns: GridColDef[] = [
  {
    field: 'order_name',
    type: 'string',
    headerName: 'Order Name',
    flex: 1
  },
  {
    field: 'customer_email',
    type: 'string',
    headerName: 'Email',
    flex: 1
  },
  {
    field: 'amount',
    type: 'string',
    headerName: 'Amount',
    flex: 0.6
  },
  {
    field: 'authorization',
    type: 'string',
    headerName: 'Authorization',
    flex: 0.6
  },
  {
    field: 'created_at',
    type: 'string',
    headerName: 'Created At',
    flex: 0.6
  },
  {
    field: 'processed_at',
    type: 'string',
    headerName: 'Processed At',
    flex: 0.6
  },
  {
    field: 'kind',
    type: 'string',
    headerName: 'Type',
    flex: 0.6,
    renderCell (item) {
      return <Chip label={item.value} color='success' />
    }
  }
]

export const ColumnsNotVisible = {
  referral_store: false
}
