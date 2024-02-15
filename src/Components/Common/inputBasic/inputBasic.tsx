import React, { ChangeEventHandler, useId } from 'react'
import { textMain, textStatic } from '../../../Themes/colors'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import { styled } from '@mui/material/styles'
import './style.css'

const StyledInput = styled('input')(({ theme }) => ({
  background: theme.palette.background.main,
  color: theme.palette.text.main,
  borderColor: `${theme.palette.text.opacity} !important`,
  ' :disabled': {
    WebkitTextFillColor: theme.palette.disabled.text,
    background: theme.palette.disabled.background
  }
}))

interface CommonProps {
  label?: string;
  value?: string;
  id?: string;
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
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onInput?: ChangeEventHandler<HTMLInputElement>;
  helperText?: string;
};

export function InputBasic (prop: CommonProps, ...props) {
  const inputID = prop.id ?? useId()
  return (
    <>
      <div className='form-control inputBasic'>
        <div>
          <label htmlFor={inputID} className={prop.fullWidth ? 'fullWidth' : ''} style={{ color: textStatic() }}>
            <span>{prop.label}</span>
            {prop.icon}
          </label>
          {prop.sublabel && (
            <Typography component='p' fontWeight={400} fontSize={12} fontFamily='Montserrat, sans-serif' marginBottom={1} style={{ color: textMain() }}>
              {prop.sublabel}
            </Typography>
          )}
        </div>
        <StyledInput {...props} name={prop.name} type={prop.type} id={inputID} className={prop.fullWidth ? 'fullWidth' : ''} placeholder={prop.placeholder} required={prop.required} onChange={prop.onChange} onInput={prop.onInput} readOnly={prop.readOnly} autoComplete={prop.autoComplete} value={prop.value} disabled={prop.disabled} style={{ ...prop.inputStyle }} />
      </div>
        {
          prop.helperText && (  
            <FormHelperText id='my-helper-text'>{prop.helperText}</FormHelperText>
          )
        }
    </>
  )
}
