import React from 'react'
import { GridColDef } from '@mui/x-data-grid'

import Chip from '@mui/material/Chip'

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export const AllOrderColumns: GridColDef[] = [
  {
    field: 'customer_name',
    type: 'string',
    headerName: 'Customer',
    flex: 1
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Order',
    flex: 1
  },
  {
    field: 'store_name',
    type: 'string',
    headerName: 'Store',
    flex: 1
  },
  {
    field: 'date',
    type: 'date',
    headerName: 'Date',
    flex: 0.6,
    valueGetter (item) {
      return new Date(item.value)
    }
  },
  {
    field: 'financial_status',
    headerName: 'Status',
    flex: 0.5,
    renderCell (item) {
      if (item.value === 'paid') {
        return <Chip label='Paid' color='success' icon={<CheckCircleOutlineIcon />} />
      } else {
        return <Chip label='Not Paid' color='info' icon={<InfoOutlinedIcon />} />
      }
    }
  },
  {
    field: 'fulfillment',
    type: 'String',
    headerName: 'Fulfillment',
    flex: 1
  },
  {
    field: 'total_order',
    type: 'String',
    headerName: 'Total Order',
    flex: 0.6
  },
  {
    field: 'total_discounts',
    type: 'String',
    headerName: 'Total Discounts',
    flex: 0.6
  },
  {
    field: 'total_items',
    type: 'String',
    headerName: 'Total Items',
    flex: 0.6
  }
]

export const AllOrdersColumnsNotVisible = {
  store_name: false,
  fulfillment: false,
  total_items: false
}
