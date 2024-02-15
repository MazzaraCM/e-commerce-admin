import React, {ReactNode} from 'react';
import { primaryMain, backgroundOpacity, disabledBackground } from '../../../Themes/colors'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function SimpleDataCard({icon, title, description, button = false, action} : {icon: ReactNode, title: string, description: ReactNode, button?: boolean, action?: () => void }){
  return(
    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', minWidth: '190px',
    padding: '10px 30px', height: '100%', backgroundColor: backgroundOpacity(), color: primaryMain(), borderRadius: '10px', 
    cursor: button ? 'pointer' : 'auto', ':hover': {backgroundColor: button ? disabledBackground() : backgroundOpacity() } }}
    onClick={action}>
      {icon}
      <Box sx={{ml: 2}}>
        <Typography variant='h6' fontWeight={400} fontSize={16} fontFamily='Montserrat, sans-serif'>
          {title}
        </Typography>
        <Typography variant='h6' fontWeight={500} fontSize={18} fontFamily='Montserrat, sans-serif'>
          {description}
        </Typography>
      </Box>
    </Box>
  )
}