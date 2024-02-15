import { useId } from 'react'
import { textMain, textStatic } from '../../../Themes/colors'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import { styled } from '@mui/material/styles'
import './style.css'

import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  background: theme.palette.background.main,
  color: theme.palette.text.main,
  borderRadius: '4px',
  minHeight: '42px',
  borderWidth: '1px',
  '.MuiInputBase-input':{
    minHeight: '42px',
    padding: '0 !important'
  },
  '.MuiInputBase-root':{
    height: '100%',
    padding: '0 10px'
  },
  borderColor: `${theme.palette.text.opacity} !important`,
  ' :disabled': {
    WebkitTextFillColor: theme.palette.disabled.text,
    background: theme.palette.disabled.background
  },
  ' .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.text.opacity} !important`,
    borderWidth: '1px !important'
  }
}))

export const StyledSelect = styled(Select)(({ theme }) => ({
  background: theme.palette.background.main,
  color: theme.palette.text.main,
  borderRadius: '4px',
  height: '42px',
  borderWidth: '1px',
  borderColor: `${theme.palette.text.opacity} !important`,
  ' :disabled': {
    WebkitTextFillColor: theme.palette.disabled.text,
    background: theme.palette.disabled.background
  },
  ' .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.text.opacity} !important`,
    borderWidth: '1px !important'
  }
}))

export function SelectBasic ({ label, sublabel, options, fullWidth, name, type, placeholder, required = false, autoComplete = null, disabled = false, value, inputStyle, readOnly = false, icon, onChange, helperText, ...props }) {
  const selectID = props.id ?? useId()

  return (
    <div className='form-control selectBasic'>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <label htmlFor={selectID} className={fullWidth && 'fullWidth'} style={{ color: textStatic() }}>
            <span>{label}</span>
            {icon}
          </label>
          {sublabel && (
            <Typography component='p' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginBottom={1} style={{ color: textMain() }}>
              {sublabel}
            </Typography>
          )}
          <StyledSelect
            id={selectID}
            value={value}
            onChange={onChange}
            {...props} name={name} type={type} className={fullWidth && 'fullWidth'} placeholder={placeholder} required={required} readOnly={readOnly} autoComplete={autoComplete} disabled={disabled} style={{ ...inputStyle }}
          >
            {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
          </StyledSelect>
          <FormHelperText id='my-helper-text'>{helperText}</FormHelperText>
        </FormControl>
      </Box>
    </div>
  )
}
