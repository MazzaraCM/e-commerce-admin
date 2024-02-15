import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InputBasic } from '../../../../../../Components/Common/inputBasic/inputBasic'
import { InputsBox } from '../../../../../../Components/Common/inputsBox/inputsBox'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { CreditCardPreview } from '../../../../../../Components/Common/creditCardPreview/creditCardPreview'
import { DateCalendarBasic } from '../../../../../../Components/Common/dateCalendarBasic/DateCalendarBasic'
import { useCustomer } from '../../../../../../Hooks/Models/customers'
import { useMessageHandler } from '../../../../../../Hooks/handlerMessages'
import { useOutletContext } from 'react-router-dom'

import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'

export default function CreditCard () {
  const userData = useOutletContext()
  const { UpdateCreditCard } = useCustomer()
  const { toastHandler } = useMessageHandler()

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      _id: editedData._id,
      number: editedData.store.customer.credit_card.number,
      date: editedData.store.customer.credit_card.date,
      code: editedData.store.customer.credit_card.cvv,
      zip_code: editedData.store.customer.credit_card.zip_code,
      name: editedData.store.customer.credit_card.name,
      type: ''
    }
    UpdateCreditCard({ body }).then(() => {
      toastHandler({ message: 'Credit Card actualizada con éxito', type: 'success' })
    })
  }

  const handleDateChange = (date) => {
    handleValueChange({ name: 'store.customer.credit_card.date', value: date })
  }

  const {
    editedData,
    handleInputChange,
    handleValueChange,
    Buttons
  } = useMyAccountSettings(userData)

  const UserCreditCard = {
    name: editedData.store.customer.credit_card?.name,
    number: `************${editedData.store.customer.credit_card?.number?.split(' ')[1]}`,
    expiry: editedData.store.customer.credit_card?.date?.split('-20').join(''),
    cvv: '',
    zip_code: editedData.store.customer.credit_card?.zip_code
  }

  return (
    <MyInformationEdit label='Credit Card Information'>
      <BoxShadowHeader title='' subtitle='Información sobre tu tarjeta de crédito guardada' />
      <form onSubmit={handleSubmit}>
        <Box sx={{ my: 1 }}>
          <CreditCardPreview number={UserCreditCard.number} cvc={UserCreditCard.cvv} expiry={UserCreditCard.expiry} name={UserCreditCard.name} />
        </Box>
        <Collapse in>
          <InputsBox columns={1}>
            <InputBasic label='Cardholder Name' name='store.customer.credit_card.name' onChange={handleInputChange} fullWidth />
            <InputBasic label='Card Number' name='store.customer.credit_card.number' onChange={handleInputChange} fullWidth />
            <DateCalendarBasic disablePast disableFuture={false} callback={(date) => handleDateChange(date)} callbackFormat='MM-YYYY' openTo='month' customSelector={<InputBasic label='Expiration Date' value={editedData.store.customer.credit_card.date} readOnly name='store.customer.credit_card.date' fullWidth required />} />
            <InputBasic label='CVV' name='store.customer.credit_card.cvv' type='number' onChange={handleInputChange} fullWidth />
            <InputBasic label='ZIP Code' name='store.customer.credit_card.zip_code' onChange={handleInputChange} fullWidth />
          </InputsBox>
        </Collapse>
        <Buttons />
      </form>
    </MyInformationEdit>
  )
}
