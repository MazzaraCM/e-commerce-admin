import { useState, useEffect } from 'react'
import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { useOutletContext } from 'react-router-dom'
import { useIndex } from '../../../../../../Hooks/Models'
import { StoreColorDots } from '../../../../../../Components/Common/storeColorDots/storeColorDots'
import { useHandlerWatcher } from '../../../../../../Hooks/handlerWatcher'
import { InputSkeleton } from '../../../../../../Components/Common/inputSkeleton/inputSkeleton'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../../../../Utils/const'

import Theme1 from '../../../../../../Public/Assets/StoreThemes/theme-1.png'
import Theme2 from '../../../../../../Public/Assets/StoreThemes/theme-2.png'
import Theme3 from '../../../../../../Public/Assets/StoreThemes/theme-3.png'
import Theme4 from '../../../../../../Public/Assets/StoreThemes/theme-4.png'
import Theme5 from '../../../../../../Public/Assets/StoreThemes/theme-5.png'
import Theme6 from '../../../../../../Public/Assets/StoreThemes/theme-6.png'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material'

const themeImages = {
  theme_1: Theme1,
  theme_2: Theme2,
  theme_3: Theme3,
  theme_4: Theme4,
  theme_5: Theme5,
  theme_6: Theme6
}

const ThemeSelector = ({ themesList, userTheme, handleValueChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(userTheme)
  const Theme = useTheme()

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme)
    handleValueChange({ name: 'store.theme_color', value: theme })
  }

  return (
    <Grid container spacing={2} my={2}>
      {themesList.map((theme) => (
        <Grid key={theme.name} item xs={4}>
          <Box key={theme.name} textAlign='center' onClick={() => handleThemeChange(theme.name)} sx={{ border: selectedTheme === theme.name ? '2px solid' : 'none', borderColor: Theme.palette.primary.main, borderRadius: '10px', padding: 2, cursor: 'pointer' }}>
            {StoreColorDots({ theme: themesList.find((item) => item.name === theme.name), justifyContent: 'center' })}
            <img src={themeImages[theme.name]} alt={`${theme.name}`} style={{ width: '100%', margin: '6px 0' }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default function Colors () {
  const userData = useOutletContext()
  const { GetThemes } = useIndex()
  const { ComponentWatcher, ButtonRetry } = useHandlerWatcher()
  const [apiRequestThemesState, setApiRequestThemesState] = useState(REQUEST_STATE_LOADING)
  const [themesList, setThemesList] = useState([])

  useEffect(() => {
    handleApiGet()
  }, [])

  function handleApiGet () {
    setApiRequestThemesState(REQUEST_STATE_LOADING)
    GetThemes({})
      .then((result) => {
        setThemesList(result.data)
        setApiRequestThemesState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestThemesState(REQUEST_STATE_ERROR)
      })
  }

  const {
    editedData,
    handleValueChange,
    handleSubmit,
    Buttons
  } = useMyAccountSettings(userData)

  return (
    <MyInformationEdit label='Store Colors'>
      <BoxShadowHeader title='' subtitle='El tema que se aplicará a tu tienda, puedes cambiarlo las veces que quieras.' />
      <ComponentWatcher requestState={apiRequestThemesState}>
        {{
          ComponentWatcherSuccess: (
            <form onSubmit={handleSubmit}>
              <Box>
                {ThemeSelector({ themesList, userTheme: editedData.store.theme_color, handleValueChange })}
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
