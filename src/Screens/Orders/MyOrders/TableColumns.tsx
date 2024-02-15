import React from 'react'
import { useDialogContext } from './context/dialog'

import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'

import StoreIcon from '@mui/icons-material/Store'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

import { OrderDetails } from './dialogs'

export const MyOrderColumns: GridColDef[] = [
  {
    field: 'customer_name',
    type: 'string',
    headerName: 'Customer',
    flex: 0.8
  },
  {
    field: 'name',
    type: 'string',
    headerName: 'Order',
    flex: 0.5
  },
  {
    field: 'date',
    type: 'date',
    headerName: 'Date',
    flex: 0.5,
    valueGetter (item) {
      return new Date(item.value)
    }
  },
  {
    field: 'data_order',
    headerName: 'Status',
    flex: 0.5,
    renderCell (item) {
      const status = item.value.financial_status
      const statusColor = status === 'paid' ? 'success' : status === 'refunded' ? 'warning' : 'info'
      const statusIcon = status === 'paid' ? <CheckCircleOutlineIcon /> : status === 'refunded' ? <ReplayOutlinedIcon /> : <InfoOutlinedIcon />
      if (item.value.cancelled_at) {
        return <Chip label='Cancelled' color='error' icon={<CancelOutlinedIcon />} />
      } else {
        return <Chip label={status} color={statusColor} icon={statusIcon} sx={{ textTransform: 'capitalize' }} />
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
  },
  {
    field: 'Actions',
    type: 'actions',
    flex: 0.1,
    getActions: (params) => {
      const { handleDialog, setDialogComponent } = useDialogContext()
      const { row: data } = params
      return [
        <GridActionsCellItem
          key='Open in new tab'
          label='Open in new tab'
          title='Open in new tab'
          icon={<StoreIcon />}
          onClick={() => window.open(`/orders/${data.name}`, '_blank', 'noreferrer')}
          showInMenu
        />,
        <GridActionsCellItem
          key='View Order Details'
          label='View Order Details'
          title='View Order Details'
          icon={<ShowChartIcon />}
          onClick={() => { handleDialog(); setDialogComponent(<OrderDetails data={data} />) }}
          showInMenu
        />
      ]
    }
  }
]

export const MyOrdersColumnsNotVisible = {
  fulfillment: false,
  total_items: false
}
