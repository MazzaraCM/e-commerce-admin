import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InputBasic } from '../../../../../../Components/Common/inputBasic/inputBasic'
import { InputsBox } from '../../../../../../Components/Common/inputsBox/inputsBox'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { useOutletContext } from 'react-router-dom'

import Box from '@mui/material/Box'

export default function Email () {
  const userData = useOutletContext()

  const {
    editedData,
    handleInputChange,
    handleSubmit,
    Buttons
  } = useMyAccountSettings(userData)

  return (
    <MyInformationEdit label='Store Email'>
      <BoxShadowHeader title='' subtitle='Tu nombre sirve para identificarte a través de los correos electrónicos y llamadas telefónicas' />
      <form onSubmit={handleSubmit}>
        <Box>
          <InputsBox columns={1}>
            <InputBasic id='email' name='store.store_email' label='Store Email' value={editedData.store.store_email} onInput={handleInputChange} fullWidth />
          </InputsBox>
        </Box>
        <Buttons />
      </form>
    </MyInformationEdit>
  )
}
