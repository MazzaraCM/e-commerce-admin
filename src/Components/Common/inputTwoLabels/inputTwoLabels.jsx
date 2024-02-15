import { useId } from 'react'
import { primaryMain, textMain } from '../../../Themes/colors'
import './style.css'

export function InputTwoLabels ({ label, fullWidth, name, type, placeholder, secondLabel, required }) {
  const inputID = useId()
  return (
    <div className='form-control'>
      <div className={`labels ${fullWidth && 'fullWidth'}`}>
        <label htmlFor={inputID} style={{ color: textMain() }}>{label}</label>
        <label htmlFor={inputID} style={{ color: primaryMain() }}>{secondLabel}</label>
      </div>
      <input name={name} type={type} id={inputID} className={fullWidth && 'fullWidth'} placeholder={placeholder} required={required} />
    </div>
  )
}
