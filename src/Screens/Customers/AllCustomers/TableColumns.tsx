import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GridColDef, GridActionsCellItem } from '@mui/x-data-grid'
import { useDialogContext } from './context/dialog'
import { error } from '../../../Themes/colors'

import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

import StoreIcon from '@mui/icons-material/Store'
import EditIcon from '@mui/icons-material/Edit'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import ReceiptIcon from '@mui/icons-material/Receipt'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import GroupIcon from '@mui/icons-material/Group'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LoyaltyIcon from '@mui/icons-material/Loyalty'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import LockIcon from '@mui/icons-material/Lock'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CheckIcon from '@mui/icons-material/Check'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import NoEncryptionGmailerrorredOutlinedIcon from '@mui/icons-material/NoEncryptionGmailerrorredOutlined'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import InstagramIcon from '@mui/icons-material/Instagram'

import { ChangeCreditCard, EditCreditCard, EditPaypalEmail, ChangeStoreName, DisableStore, DeleteStore } from './dialogs'

export const AllCostumersColumns: GridColDef[] = [
  {
    field: 'name',
    type: 'string',
    headerName: 'Name',
    flex: 1
  },
  {
    field: 'subdomain',
    type: 'string',
    headerName: 'Subdomain',
    flex: 1

  },
  {
    field: 'store_name',
    type: 'string',
    headerName: 'Store Name',
    flex: 1
  },
  {
    field: 'customer_email',
    type: 'string',
    headerName: 'Customer Email',
    flex: 1
  },
  {
    field: 'social',
    type: 'string',
    headerName: 'Social Network',
    flex: 1,
    valueGetter: (params) => {
      return params.value
    },
    renderCell: ({ value }) => {
      return (
        <Box sx={{
          display: 'grid',
          justifyContent: 'center',
          alignContent: 'center',
          gridTemplateColumns: 'repeat(4, 1fr)',
          width: '100%',
          height: '100%'
        }}
        >
          {value.facebook && (
            <Button onClick={() => window.open(value.facebook, '_blank', 'noreferrer')} sx={{ padding: 0, width: 0, minWidth: 0, color: '#2196f3' }}>
              <FacebookIcon />
            </Button>
          )}
          {value.twitter && (
            <Button onClick={() => window.open(value.twitter, '_blank', 'noreferrer')} sx={{ padding: 0, width: 0, minWidth: 0, color: '#03a9f4' }}>
              <TwitterIcon />
            </Button>
          )}
          {value.whatsapp && (
            <Button onClick={() => window.open(value.whatsapp, '_blank', 'noreferrer')} sx={{ padding: 0, width: 0, minWidth: 0, color: '#4caf50' }}>
              <WhatsAppIcon />
            </Button>
          )}
          {value.instagram && (
            <Button onClick={() => window.open(value.instagram, '_blank', 'noreferrer')} sx={{ padding: 0, width: 0, minWidth: 0, color: '#515BD4' }}>
              <InstagramIcon />
            </Button>
          )}
        </Box>
      )
    }
  },
  {
    field: 'date_created',
    headerName: 'Date Created',
    type: 'date',
    flex: 0.6,
    valueGetter (item) {
      return new Date(item.value)
    }
  },
  {
    field: 'first_order',
    headerName: 'First Order',
    flex: 0.6,
    type: 'date',
    valueGetter (item) {
      if (item.value) {
        return new Date(item.value.created_at)
      }
    }
  },
  {
    field: 'last_order',
    headerName: 'Last Order',
    flex: 0.6,
    type: 'date',
    valueGetter (item) {
      if (item.value) {
        return new Date(item.value.created_at)
      }
    }
  },
  {
    field: 'verified',
    headerName: 'Verified',
    flex: 0.5,
    renderCell (item) {
      if (item.value) {
        return <Chip size='small' label='Verified' color='success' icon={<CheckCircleOutlineIcon />} />
      } else {
        return <Chip size='small' label='Not Verified' color='info' icon={<InfoOutlinedIcon />} />
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
    field: 'Actions',
    type: 'actions',
    flex: 0.1,
    getActions: (params) => {
      const navigate = useNavigate()
      const { handleDialog, setDialogComponent } = useDialogContext()
      const { row: data } = params
      return [
        <GridActionsCellItem
          key='Store'
          label='Store'
          title='Store'
          icon={<StoreIcon />}
          onClick={() => window.open(`https://${data.subdomain}.ventadirekta.com/`, '_blank', 'noreferrer')}
          showInMenu
        />,
        <GridActionsCellItem
          key='Statement'
          label='Statement'
          title='Statement'
          icon={<ShowChartIcon />}
          onClick={() => navigate(`/statement/store-balance/${data.subdomain}`)}
          showInMenu
        />,
        <GridActionsCellItem
          key='Orders'
          label='Orders'
          title='Orders'
          icon={<ReceiptIcon />}
          onClick={() => navigate(`/orders/show-orders/${data.subdomain}`)}
          showInMenu
        />,
        <GridActionsCellItem
          key='Discounts'
          label='Discounts'
          title='Discounts'
          icon={<LocalOfferIcon />}
          onClick={() => navigate(`/discount-codes/show-discounts/${data.subdomain}`)}
          showInMenu
        />,
        <GridActionsCellItem
          key='Customers'
          label='Customers'
          title='Customers'
          icon={<GroupIcon />}
          onClick={() => navigate(`/customers/my-customers/${data.subdomain}`)}
          showInMenu
        />,
        <GridActionsCellItem
          key='Account'
          label='Account'
          title='Account'
          icon={<AccountBoxIcon />}
          onClick={() => navigate(`/users/my-account/${data.subdomain}`)}
          showInMenu
        />,
        <GridActionsCellItem
          key='Referral List'
          label='Referral List'
          title='Referral List'
          icon={<LoyaltyIcon />}
          onClick={() => navigate(`/customers/referral-list/${data.subdomain}`)}
          showInMenu
        />,
        <GridActionsCellItem
          key='Let Change Credit Card'
          label='Let Change Credit Card'
          title='Let Change Credit Card'
          icon={<CreditCardIcon />}
          onClick={() => { handleDialog(); setDialogComponent(<ChangeCreditCard data={data} />) }}
          showInMenu
        />,
        <GridActionsCellItem
          key='Edit Credit Card'
          label='Edit Credit Card'
          title='Edit Credit Card'
          icon={<CreditCardIcon />}
          onClick={() => { handleDialog(); setDialogComponent(<EditCreditCard data={data} />) }}
          showInMenu
        />,
        <GridActionsCellItem
          key='Edit Paypal Email'
          label='Edit Paypal Email'
          title='Edit Paypal Email'
          icon={<AlternateEmailIcon />}
          onClick={() => { handleDialog(); setDialogComponent(<EditPaypalEmail data={data} />) }}
          showInMenu
        />,
        <GridActionsCellItem
          key='Change Store Name'
          label='Change Store Name'
          title='Change Store Name'
          icon={<EditIcon />}
          onClick={() => { handleDialog(); setDialogComponent(<ChangeStoreName data={data} />) }}
          showInMenu
        />,
        <GridActionsCellItem
          key='Disable Store'
          label='Disable Store'
          title='Disable Store'
          icon={<LockIcon />}
          onClick={() => { handleDialog(); setDialogComponent(<DisableStore data={data} />) }}
          showInMenu
        />,
        <GridActionsCellItem
          key='Delete Store'
          label='Delete Store'
          title='Delete Store'
          icon={<DeleteForeverIcon sx={{ color: error() }} />}
          onClick={() => { handleDialog(); setDialogComponent(<DeleteStore data={data} />) }}
          showInMenu
          sx={{ color: error() }}
        />
      ]
    }
  }
]

export const AllCostumersColumnsNotVisible = {
  first_order: false,
  last_order: false,
  status: false,
  social: false
}
