import React from 'react'
import { useUserContext } from '../../../Context/user'
import { Main } from '../../../Components/Common/main/main'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { useMyAccountGeneral } from './myAccountGeneral'
import { useRouteMatch } from '../../../Utils/utils'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import TabContext from '@mui/lab/TabContext'

const AccountRender = ({ userData }) => {
  const { RouteMatch } = useMyAccountGeneral({ userData })
  const routeMatch = useRouteMatch(RouteMatch)
  const currentTab = routeMatch?.pattern?.path

  const storeData = userData.store
  const customerData = userData.store?.customer

  return (
    <Grid container spacing={2}>
      <TabContext value={currentTab}>
        <Grid item xs={12} md={8}>
          <MainContent userData={userData} storeData={storeData} customerData={customerData} tabValue={currentTab} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SideContent userData={userData} storeData={storeData} customerData={customerData} tabValue={currentTab} />
        </Grid>
      </TabContext>
    </Grid>
  )
}

const MainContent = ({ userData, storeData, customerData }) => {
  const { TabsContent } = useMyAccountGeneral({ userData, customerData, storeData })
  return TabsContent
}

const SideContent = ({ userData, storeData, customerData, tabValue }) => {
  const { TabLabels } = useMyAccountGeneral({ userData, customerData, storeData, tabValue })
  return (
    <>
      <BoxShadow sx={{ padding: 0, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ borderRadius: '10px', width: '100%', height: '130px', backgroundImage: 'url(https://w0.peakpx.com/wallpaper/670/62/HD-wallpaper-minimalist-sunset-8k-minimalist-minimalism-sunset-dribbble-simple-background.jpg)' }} />
        <Avatar alt={userData.first_name} sx={{ width: 100, height: 100, top: '70px', position: 'absolute' }}>{userData.first_name[0]}{userData.last_name[0]}</Avatar>
        <Box padding={2} display='flex' flexDirection='column' alignItems='center' marginTop='30px'>
          <Typography variant='h6' fontWeight={600} fontSize={16} fontFamily='Montserrat, sans-serif'>
            {userData.first_name} {userData.last_name}
          </Typography>
          <Typography variant='h6' fontWeight={500} fontSize={14} fontFamily='Montserrat, sans-serif'>
            {userData.role.name}
          </Typography>
          {customerData && (
            <Typography variant='h6' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif'>
              {customerData.billing_city}, {customerData.billing_country}
            </Typography>
          )}
        </Box>
      </BoxShadow>
      <BoxShadow sx={{ marginTop: 2 }}>
        {TabLabels}
      </BoxShadow>
    </>
  )
}

export default function MyAccount () {
  const { user } = useUserContext()
  const { user: userData } = user

  return (
    <Main>
      <AccountRender userData={userData} />
    </Main>
  )
}
