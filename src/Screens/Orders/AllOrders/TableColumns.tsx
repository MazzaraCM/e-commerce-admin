import React from 'react'
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { useDialogContext } from './context/dialog'
import { error } from '../../../Themes/colors'

import Chip from '@mui/material/Chip'

import StoreIcon from '@mui/icons-material/Store'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import { ChangeStoreName, DeleteStore } from './dialogs'

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
          onClick={() => { handleDialog(); setDialogComponent(<ChangeStoreName data={data} />) }}
          showInMenu
        />,
        <GridActionsCellItem
          key='Cancel Order'
          label='Cancel Order'
          title='Cancel Order'
          icon={<DeleteForeverIcon sx={{ color: error() }} />}
          onClick={() => { handleDialog(); setDialogComponent(<DeleteStore data={data} />) }}
          showInMenu
          sx={{ color: error() }}
        />
      ]
    }
  }
]

export const AllOrdersColumnsNotVisible = {
  store_name: false,
  fulfillment: false,
  total_items: false
}
