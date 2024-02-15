import { useState, useEffect } from 'react'
import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { SelectBasic } from '../../../../../../Components/Common/selectBasic/selectBasic'
import { InputsBox } from '../../../../../../Components/Common/inputsBox/inputsBox'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { useOutletContext } from 'react-router-dom'
import { useIndex } from '../../../../../../Hooks/Models'
import { useHandlerWatcher } from '../../../../../../Hooks/handlerWatcher'
import { InputSkeleton } from '../../../../../../Components/Common/inputSkeleton/inputSkeleton'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../../../../Utils/const'

import Box from '@mui/material/Box'

export default function Language () {
  const userData = useOutletContext()
  const { GetLanguages } = useIndex()
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const [apiRequestLanguagesState, setApiRequestLanguagesState] = useState(REQUEST_STATE_LOADING)
  const [languageOptions, setLanguageOptions] = useState([])

  useEffect(() => {
    handleApiGet()
  }, [])

  function handleApiGet () {
    setApiRequestLanguagesState(REQUEST_STATE_LOADING)
    GetLanguages({})
      .then((result) => {
        setLanguageOptions(result.data.map((language) => { return { label: language.name, value: language.code } }))
        setApiRequestLanguagesState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestLanguagesState(REQUEST_STATE_ERROR)
      })
  }

  const {
    editedData,
    handleInputChange,
    handleSubmit,
    Buttons
  } = useMyAccountSettings(userData)

  return (
    <MyInformationEdit label='Store Language'>
      <BoxShadowHeader title='' subtitle='El lenguaje por defecto de tu tienda, con este lenguaje cargará tu tienda por primera vez a todos los usuarios que la visiten' />
      <ComponentWatcher requestState={apiRequestLanguagesState}>
        {{
          ComponentWatcherSuccess: (
            <form onSubmit={handleSubmit}>
              <Box>
                <InputsBox columns={1}>
                  <SelectBasic id='language' name='store.language' label='Store Language' options={languageOptions} value={editedData.store.language} onChange={handleInputChange} fullWidth />
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
