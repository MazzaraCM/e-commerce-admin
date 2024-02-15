import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InputBasic } from '../../../../../../Components/Common/inputBasic/inputBasic'
import { InputsBox } from '../../../../../../Components/Common/inputsBox/inputsBox'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { useOutletContext } from 'react-router-dom'

import Box from '@mui/material/Box'

export default function Province () {
  const userData = useOutletContext()

  const {
    editedData,
    handleInputChange,
    handleSubmit,
    Buttons
  } = useMyAccountSettings(userData)

  return (
    <MyInformationEdit label='Province'>
      <BoxShadowHeader title='' subtitle='Tu nombre sirve para identificarte a través de los correos electrónicos y llamadas telefónicas' />
      <form onSubmit={handleSubmit}>
        <Box>
          <InputsBox columns={1}>
            <InputBasic id='province' name='store.customer.billing_state' label='Province' value={editedData.store.customer.billing_state} onInput={handleInputChange} fullWidth />
          </InputsBox>
        </Box>
        <Buttons />
      </form>
    </MyInformationEdit>
  )
}
