import React from 'react'
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { useDialogContext } from './context/dialog'
import { useFormContext } from './context/form'
import { error, textStatic } from '../../../Themes/colors'

import Chip from '@mui/material/Chip'

import Icon from '@mui/material/Icon'
import CheckIcon from '@mui/icons-material/Check'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import NoEncryptionGmailerrorredOutlinedIcon from '@mui/icons-material/NoEncryptionGmailerrorredOutlined'
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

import { DisableDiscountCode, DeleteDiscountCode } from './dialogs'

export const MyDiscountsColumns: GridColDef[] = [
  {
    field: 'code',
    type: 'string',
    headerName: 'Code',
    flex: 1
  },
  {
    field: 'discount_type',
    type: 'string',
    headerName: 'Discount Type',
    flex: 0.6
  },
  {
    field: 'amount',
    type: 'string',
    headerName: 'Amount',
    flex: 0.6,
    valueGetter (item) {
      return item.row.discount_type === 'Amount' ? `$ ${item.value}` : `% ${item.value}`
    }
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
    field: 'expired',
    headerName: 'Expired',
    flex: 0.5,
    renderCell (item) {
      if (item.value) {
        return <Chip size='small' label='Expired' color='warning' icon={<DoNotDisturbAltOutlinedIcon />} />
      } else {
        return <Chip size='small' label='Not Expired' color='success' icon={<CheckCircleOutlineIcon />} />
      }
    }
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    renderCell (item) {
      const status = item.value
      if (status === 'Active') {
        return <Chip size='small' label={status} color='success' variant='outlined' icon={<CheckIcon />} />
      } else {
        return <Chip size='small' label={status} color='warning' variant='outlined' icon={<NoEncryptionGmailerrorredOutlinedIcon />} />
      }
    }
  },
  {
    field: 'multi_use',
    type: 'string',
    headerName: 'Multi Use',
    flex: 0.6,
    align: 'center',
    renderCell (item) {
      if (item.value) {
        return <Icon sx={{ color: textStatic() }}><CheckIcon /></Icon>
      } else {
        return <Icon sx={{ color: textStatic() }}><DoNotDisturbAltOutlinedIcon /></Icon>
      }
    }
  },
  {
    field: 'return_code',
    type: 'string',
    headerName: 'Return Code',
    flex: 0.6,
    align: 'center',
    renderCell (item) {
      if (item.value) {
        return <Icon sx={{ color: textStatic() }}><CheckIcon /></Icon>
      } else {
        return <Icon sx={{ color: textStatic() }}><DoNotDisturbAltOutlinedIcon /></Icon>
      }
    }
  },
  {
    field: 'Actions',
    type: 'actions',
    flex: 0.1,
    getActions: (params) => {
      const { handleDialog, setDialogComponent } = useDialogContext()
      const { setEditing, setEditData } = useFormContext()
      const { row: data } = params

      const handleUpdate = (data) => {
        setEditing(true)
        setEditData(data)
      }

      return [
        <GridActionsCellItem
          key='Update'
          label='Update'
          title='Update'
          icon={<EditOutlinedIcon />}
          onClick={() => handleUpdate(data)}
          showInMenu
        />,
        <GridActionsCellItem
          key={data.status === 'Active' ? 'Disable' : 'Enable'}
          label={data.status === 'Active' ? 'Disable' : 'Enable'}
          title={data.status === 'Active' ? 'Disable' : 'Enable'}
          icon={data.status === 'Active' ? <LockOutlinedIcon /> : <LockOpenIcon />}
          onClick={() => { handleDialog(); setDialogComponent(<DisableDiscountCode data={data} />) }}
          showInMenu
        />,
        <GridActionsCellItem
          key='Delete'
          label='Delete'
          title='Delete'
          icon={<DeleteForeverOutlinedIcon sx={{ color: error() }} />}
          onClick={() => { handleDialog(); setDialogComponent(<DeleteDiscountCode data={data} />) }}
          showInMenu
          sx={{ color: error() }}
        />
      ]
    }
  }
]

export const MyDiscountsColumnsNotVisible = {
}
