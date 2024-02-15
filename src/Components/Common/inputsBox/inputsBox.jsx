import Box from '@mui/material/Box'

export const InputsBox = ({ children, columns = 2, style = {} }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, ${100 / columns}fr))`,
        gridAutoRows: '1fr',
        gap: 1,
        padding: 0,
        ...style,
        '& > .inputBasic:not(style)': { my: 1, mr: 1, width: '100%' }
      }}
      noValidate
      autoComplete='off'
    >
      {children}
    </Box>
  )
}
