import React from 'react'
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid'

import Chip from '@mui/material/Chip'

import StoreIcon from '@mui/icons-material/Store'

export const AllDiscountsColumns: GridColDef[] = [
  {
    field: 'code',
    type: 'string',
    headerName: 'Code',
    flex: 1
  },
  {
    field: 'amount',
    type: 'string',
    headerName: 'Amount',
    flex: 0.5
  },
  {
    field: 'store_name',
    type: 'string',
    headerName: 'Store',
    flex: 1
  },
  {
    field: 'date_start',
    type: 'date',
    headerName: 'Start Date',
    flex: 0.6,
    valueGetter (item) {
      return new Date(item.value)
    }
  },
  {
    field: 'date_end',
    type: 'date',
    headerName: 'End Date',
    flex: 0.6,
    valueGetter (item) {
      return new Date(item.value)
    }
  },
  {
    field: 'use_code',
    headerName: 'Use Code',
    flex: 0.5,
    renderCell (item) {
      const valid = item.value.valid
      const order = item.value.order

      if (!valid) {
        return <Chip size='small' label='Not Used' color='success' variant='outlined' />
      } else {
        return <Chip size='small' label={order} color='warning' variant='outlined' />
      }
    }
  },
  {
    field: 'Actions',
    type: 'actions',
    flex: 0.1,
    getActions: (params) => {
      const { row: data } = params
      return [
        <GridActionsCellItem
          key='Open in new tab'
          label='Open in new tab'
          title='Open in new tab'
          icon={<StoreIcon />}
          onClick={() => window.open(`/orders/${data.name}`, '_blank', 'noreferrer')}
          showInMenu
        />
      ]
    }
  }
]

export const AllDiscountsColumnsNotVisible = {
  referral_store: false
}
