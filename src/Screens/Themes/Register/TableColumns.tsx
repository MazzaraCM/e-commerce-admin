import React from 'react'
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { useDialogContext } from './context/dialog'
import { useFormContext } from './context/form'
import { error } from '../../../Themes/colors'
import { StoreColorDot } from '../../../Components/Common/storeColorDots/storeColorDots'

import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import NoEncryptionGmailerrorredOutlinedIcon from '@mui/icons-material/NoEncryptionGmailerrorredOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

import { DisableTheme, DeleteTheme } from './dialogs'

export const Columns: GridColDef[] = [
  {
    field: 'title',
    type: 'string',
    headerName: 'Title',
    flex: 0.6
  },
  {
    field: 'primary_color',
    type: 'string',
    headerName: 'Primary Color',
    flex: 0.6,
    renderCell (item) {
      return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
          <StoreColorDot color={item.value} />
          <Typography component='h6' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginLeft={1}>
            {item.value}
          </Typography>
        </Box>
      )
    }
  },
  {
    field: 'secondary_color',
    type: 'string',
    headerName: 'Secondary Color',
    flex: 0.6,
    renderCell (item) {
      return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
          <StoreColorDot color={item.value} />
          <Typography component='h6' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginLeft={1}>
            {item.value}
          </Typography>
        </Box>
      )
    }
  },
  {
    field: 'text_color',
    type: 'string',
    headerName: 'Text Color',
    flex: 0.6,
    renderCell (item) {
      return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
          <StoreColorDot color={item.value} />
          <Typography component='h6' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginLeft={1}>
            {item.value}
          </Typography>
        </Box>
      )
    }
  },
  {
    field: 'background_color',
    type: 'string',
    headerName: 'Background Color',
    flex: 0.6,
    renderCell (item) {
      return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
          <StoreColorDot color={item.value} />
          <Typography component='h6' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginLeft={1}>
            {item.value}
          </Typography>
        </Box>
      )
    }
  },
  {
    field: 'success_color',
    type: 'string',
    headerName: 'Success Color',
    flex: 0.6,
    renderCell (item) {
      return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
          <StoreColorDot color={item.value} />
          <Typography component='h6' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginLeft={1}>
            {item.value}
          </Typography>
        </Box>
      )
    }
  },
  {
    field: 'error_color',
    type: 'string',
    headerName: 'Error Color',
    flex: 0.6,
    renderCell (item) {
      return (
        <Box sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', display: 'flex' }}>
          <StoreColorDot color={item.value} />
          <Typography component='h6' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginLeft={1}>
            {item.value}
          </Typography>
        </Box>
      )
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
          onClick={() => { handleDialog(); setDialogComponent(<DisableTheme data={data} />) }}
          showInMenu
        />,
        <GridActionsCellItem
          key='Delete'
          label='Delete'
          title='Delete'
          icon={<DeleteForeverOutlinedIcon sx={{ color: error() }} />}
          onClick={() => { handleDialog(); setDialogComponent(<DeleteTheme data={data} />) }}
          showInMenu
          sx={{ color: error() }}
        />
      ]
    }
  }
]

export const ColumnsNotVisible = {
  success_color: false,
  error_color: false
}
