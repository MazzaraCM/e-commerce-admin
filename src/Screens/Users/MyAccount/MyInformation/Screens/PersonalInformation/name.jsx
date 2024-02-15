import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InputBasic } from '../../../../../../Components/Common/inputBasic/inputBasic'
import { InputsBox } from '../../../../../../Components/Common/inputsBox/inputsBox'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { useOutletContext } from 'react-router-dom'

import Box from '@mui/material/Box'

export default function FirstName () {
  const userData = useOutletContext()

  const {
    editedData,
    handleInputChange,
    handleSubmit,
    Buttons
  } = useMyAccountSettings(userData)

  return (
    <MyInformationEdit label='Name'>
      <BoxShadowHeader title='' subtitle='Tu nombre sirve para identificarte a través de los correos electrónicos y llamadas telefónicas' />
      <form onSubmit={handleSubmit}>
        <Box>
          <InputsBox columns={1}>
            <InputBasic id='first_name' name='first_name' label='First Name' value={editedData.first_name} onInput={handleInputChange} fullWidth />
            <InputBasic id='last_name' name='last_name' label='Last Name' value={editedData.last_name} onInput={handleInputChange} fullWidth />
          </InputsBox>
        </Box>
        <Buttons />
      </form>
    </MyInformationEdit>
  )
}
