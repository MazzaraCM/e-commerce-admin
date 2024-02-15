import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function PlaceUnderConstruction () {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      height: '70vh'
    }}
    >
      <Typography variant='h6' fontWeight={600} fontSize={20} fontFamily='Montserrat, sans-serif' sx={{ position: 'absolute' }}>
        Place Under Construction
      </Typography>
    </Box>
  )
}
