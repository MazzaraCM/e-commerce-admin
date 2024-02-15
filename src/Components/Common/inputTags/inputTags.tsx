import React from 'react'
import { StyledTextField } from '../selectBasic/selectBasic'

import Autocomplete from '@mui/material/Autocomplete'

export function InputTags ({ options, label, placeholder, limitTags, name } : { options: Array<string>, placeholder: string, label: string, limitTags?: number, name: string}) {
  return (
    <Autocomplete
      multiple
      limitTags={limitTags}
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <StyledTextField {...params} label={label} placeholder={placeholder} name={name} fullWidth />
      )}
    />
  )
}
