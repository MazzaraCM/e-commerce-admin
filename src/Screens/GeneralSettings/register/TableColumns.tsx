import React from 'react'
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { useDialogContext } from './context/dialog'
import { useFormContext } from './context/form'
import { error } from '../../../Themes/colors'

import Chip from '@mui/material/Chip'

import CheckIcon from '@mui/icons-material/Check'
import NoEncryptionGmailerrorredOutlinedIcon from '@mui/icons-material/NoEncryptionGmailerrorredOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

import { DisableDiscountCode, DeleteDiscountCode } from './dialogs'

export const SettingsColumns: GridColDef[] = [
  {
    field: 'name',
    type: 'string',
    headerName: 'Name',
    flex: 0.5
  },
  {
    field: 'commission_percentage',
    type: 'number',
    headerName: 'Commission Percentage',
    align: 'center',
    flex: 1
  },
  {
    field: 'referral_commission_percentage',
    type: 'string',
    headerName: 'Referral Commission Percentage',
    align: 'center',
    flex: 1
  },
  {
    field: 'limit_sales',
    type: 'string',
    headerName: 'Limit Sales',
    align: 'center',
    flex: 1,
    valueGetter (params) {
      return params.value.text
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

      const actionButtons = [
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

      if (!data.primary) {
        actionButtons.push(
          <GridActionsCellItem
            label='Make Primary'
            title='Make Primary'
            icon={<CheckIcon />}
            onClick={() => handleUpdate(data)}
            showInMenu
          />
        )
      }

      return actionButtons
    }
  }
]

export const SettingsColumnsNotVisible = {
}
