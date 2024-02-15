import React from 'react'
import { Main } from '../../../Components/Common/main/main'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { TabOrders } from './Tabs/Orders/tabOrders'
import { TabRefunds } from './Tabs/Refunds/tabRefunds'
import { TabReturns } from './Tabs/Returns/tabReturns'

import PropTypes from 'prop-types';
import Tabs from "@mui/material/Tabs";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`audit-orders-tabpanel-${index}`}
        aria-labelledby={`audit-orders-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ py: 3}}>
            {children}
          </Box>
        )}
      </div>
    );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
  
export function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

function MainRender(){
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Orders" {...a11yProps(0)} />
            <Tab label="Refunds" {...a11yProps(1)} />
            <Tab label="Returns" {...a11yProps(2)} />
        </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TabOrders />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TabRefunds />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TabReturns />
        </CustomTabPanel>
      </Box>
    );
}

export default function AuditOrders () {

  return (
    <Main>
      <BoxShadow>
        <MainRender/>
      </BoxShadow>
    </Main>
  )
}
