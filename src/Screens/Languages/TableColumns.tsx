import React from 'react'
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { useDialogContext } from './context/dialog'
import { useFormContext } from './context/form'
import { error, textStatic } from '../../Themes/colors'

import Chip from '@mui/material/Chip'

import Icon from '@mui/material/Icon'
import CheckIcon from '@mui/icons-material/Check'
import NoEncryptionGmailerrorredOutlinedIcon from '@mui/icons-material/NoEncryptionGmailerrorredOutlined'
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

import { DisableDiscountCode, DeleteDiscountCode } from './dialogs'

export const LanguagesColumns: GridColDef[] = [
  {
    field: 'primary',
    type: 'string',
    headerName: 'Primary',
    flex: 0.4,
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
    field: 'name',
    type: 'string',
    headerName: 'Name',
    flex: 0.5
  },
  {
    field: 'code',
    type: 'string',
    headerName: 'Code',
    flex: 0.5
  },
  {
    field: 'country',
    type: 'string',
    headerName: 'Country',
    flex: 1
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

export const LanguagesColumnsNotVisible = {
}
