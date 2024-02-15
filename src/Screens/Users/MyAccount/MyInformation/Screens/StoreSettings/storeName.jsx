import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InputBasic } from '../../../../../../Components/Common/inputBasic/inputBasic'
import { InputsBox } from '../../../../../../Components/Common/inputsBox/inputsBox'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { useOutletContext } from 'react-router-dom'

import Box from '@mui/material/Box'

export default function StoreName () {
  const userData = useOutletContext()

  const {
    editedData
  } = useMyAccountSettings(userData)

  return (
    <MyInformationEdit label='Store Information'>
      <BoxShadowHeader title='' subtitle='La información estática sobre tu tienda, esta información no se puede modificar' />
      <Box>
        <InputsBox columns={1}>
          <InputBasic id='store_name' name='store.store_name' label='Store Name' value={editedData.store.store_name} readOnly fullWidth />
          <InputBasic id='subdomain' name='store.subdomain' label='Store Subdomain' value={editedData.store.subdomain} readOnly fullWidth />
          <InputBasic id='store_name_initials' name='store.store_name_initials' label='Store Name Initials' value={editedData.store.store_name_initials} readOnly fullWidth />
        </InputsBox>
      </Box>
    </MyInformationEdit>
  )
}
