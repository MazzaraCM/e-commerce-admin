import React from 'react'
import { GridColDef } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

export const MyCostumersColumns: GridColDef[] = [
  {
    field: 'name',
    type: 'string',
    headerName: 'Name',
    flex: 1
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    flex: 1

  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Phone Number',
    flex: 1
  },
  {
    field: 'orders_count',
    type: 'string',
    headerName: 'Count Orders',
    flex: 1
  },
  {
    field: 'total_spent',
    type: 'string',
    headerName: 'Total Spent',
    flex: 1,
    valueGetter (item) {
      return (item.value.format)
    }
  },
  {
    field: 'last_order',
    type: 'string',
    headerName: 'Last Order',
    flex: 1,
    renderCell (item) {
      return <Button onClick={() => window.open(`/orders/${item.value.name}`, '_blank', 'noreferrer')}>{item.value.name}</Button>
    }
  }
]

export const MyCostumersColumnsNotVisible = {
}
