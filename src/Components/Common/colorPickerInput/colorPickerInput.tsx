import React, { useId } from 'react'
import { textMain, textStatic } from '../../../Themes/colors'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import { MuiColorInput, MuiColorInputColors } from 'mui-color-input'
import type { ColorInput as MuiColorInputValue } from '@ctrl/tinycolor'
import './style.css'

interface CommonProps {
  label?: string;
  value: MuiColorInputValue;
  sublabel?: string;
  fullWidth?: boolean;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  inputStyle?: React.CSSProperties;
  readOnly?: boolean;
  icon?: React.JSX.Element;
  onChange?: (value: string, colors: MuiColorInputColors) => void;
  onInput?: (value: string, colors: MuiColorInputColors) => void;
  helperText?: string;
};

export function ColorPickerInput (prop: CommonProps) {
  const inputID = useId()
  return (
    <div className='form-control inputBasic colorPicker'>
      <label htmlFor={inputID} className={prop.fullWidth ? 'fullWidth' : ''} style={{ color: textStatic() }}>
        <span>{prop.label}</span>
        {prop.icon}
      </label>
      {prop.sublabel && (
        <Typography component='p' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginBottom={1} style={{ color: textMain() }}>
          {prop.sublabel}
        </Typography>
      )}
      <MuiColorInput value={prop.value} onChange={prop.onChange} />
      <FormHelperText id='my-helper-text'>{prop.helperText}</FormHelperText>
    </div>
  )
}
