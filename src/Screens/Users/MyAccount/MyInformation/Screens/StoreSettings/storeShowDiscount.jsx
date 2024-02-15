import { useState, useEffect } from 'react'
import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { SelectBasic } from '../../../../../../Components/Common/selectBasic/selectBasic'
import { InputsBox } from '../../../../../../Components/Common/inputsBox/inputsBox'
import { InputSkeleton } from '../../../../../../Components/Common/inputSkeleton/inputSkeleton'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { useOutletContext } from 'react-router-dom'
import { useStore } from '../../../../../../Hooks/Models/store'
import { useHandlerWatcher } from '../../../../../../Hooks/handlerWatcher'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../../../../Utils/const'

import Box from '@mui/material/Box'

export default function ShowDisounts () {
  const userData = useOutletContext()
  const { GetDiscounts } = useStore()
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const [apiRequestState, setApiRequestState] = useState(REQUEST_STATE_LOADING)
  const [discountOptions, setDiscountOptions] = useState([])

  useEffect(() => {
    handleApiGet()
  }, [])

  function handleApiGet () {
    setApiRequestState(REQUEST_STATE_LOADING)
    GetDiscounts({})
      .then((result) => {
        console.log(result)
        setDiscountOptions(result.data.map((item) => { return { label: `${item.code} (%${item.amount})`, value: item._id } }))
        setDiscountOptions((prevOptions) => [
          ...prevOptions,
          { label: 'Ninguno', value: '' }
        ])
        setApiRequestState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestState(REQUEST_STATE_ERROR)
      })
  }

  const {
    editedData,
    handleInputChange,
    handleSubmit,
    Buttons
  } = useMyAccountSettings(userData)

  return (
    <MyInformationEdit label='Show Discounts'>
      <BoxShadowHeader title='' subtitle='Tu nombre sirve para identificarte a través de los correos electrónicos y llamadas telefónicas' />
      <ComponentWatcher requestState={apiRequestState}>
        {{
          ComponentWatcherSuccess: (
            <form onSubmit={handleSubmit}>
              <Box>
                <InputsBox columns={1}>
                  <SelectBasic id='show_discount' name='store.show_discount' label='Show discount' options={discountOptions} value={editedData.store.show_discount} onChange={handleInputChange} fullWidth />
                </InputsBox>
              </Box>
              <Buttons />
            </form>
          ),
          ComponentWatcherLoading: <InputSkeleton />,
          ComponentWatcherError: <ButtonRetry onClick={() => handleApiGet()} />
        }}
      </ComponentWatcher>
    </MyInformationEdit>
  )
}
