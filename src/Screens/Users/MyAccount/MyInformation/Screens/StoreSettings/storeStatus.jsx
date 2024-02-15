import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InputsBox } from '../../../../../../Components/Common/inputsBox/inputsBox'
import { InformationButton } from '../../../../../../Components/Common/informationButton/informationButton'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { useOutletContext } from 'react-router-dom'

import Chip from '@mui/material/Chip'

import Box from '@mui/material/Box'

export default function StoreStatus () {
  const userData = useOutletContext()

  const {
    editedData
  } = useMyAccountSettings(userData)

  return (
    <MyInformationEdit label='Store Status'>
      <BoxShadowHeader title='' subtitle='La información estática sobre tu tienda, esta información no se puede modificar' />
      <Box>
        <InputsBox columns={1}>
          <InformationButton label='Verified Status' value={<Chip label={editedData.store.verified ? 'Verified' : 'Not-verified'} color={editedData.store.verified ? 'success' : 'info'} />} icon='' clickeable={false} />
          <InformationButton label='Store Status' value={<Chip label={editedData.store.status} color={editedData.store.status ? 'success' : 'info'} variant='outlined' />} icon='' clickeable={false} />
        </InputsBox>
      </Box>
    </MyInformationEdit>
  )
}
