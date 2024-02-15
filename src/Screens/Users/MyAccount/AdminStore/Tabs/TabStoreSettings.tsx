import React, { useState, useEffect } from 'react'
import { BoxShadow } from '../../../../../Components/Common/boxShadow/boxShadow'
import { BoxShadowHeader } from '../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InputBasic } from '../../../../../Components/Common/inputBasic/inputBasic'
import { InputsBox } from '../../../../../Components/Common/inputsBox/inputsBox'
import { AntSwitch } from '../../../../../Components/Common/antSwitch/antSwitch'
import { CopyToClipboardButton } from '../../../../../Components/Common/clipboardButton/clipboardButton'
import { InformationButton } from '../../../../../Components/Common/informationButton/informationButton'
import { validProductionAdminUrl } from '../../../../../Utils/utils'
import { useIndex } from '../../../../../Hooks/Models'
import { REQUEST_STATE_LOADING, REQUEST_STATE_SUCCESS, REQUEST_STATE_ERROR } from '../../../../../Utils/const'
import { StoreColorDots } from '../../../../../Components/Common/storeColorDots/storeColorDots'
import useMyAccountSettings from '../../../../../Hooks/myAccountSettings'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'

export function TabStoreSettings ({ userData, storeData }) {
  const { GetLanguages, GetThemes, GetCollections } = useIndex()
  const [apiRequestLanguagesState, setApiRequestLanguagesState] = useState(REQUEST_STATE_LOADING)
  const [apiRequestThemesState, setApiRequestThemesState] = useState(REQUEST_STATE_LOADING)
  const [apiRequestCollectionsState, setApiRequestCollectionsState] = useState(REQUEST_STATE_LOADING)
  const [languageList, setLanguageList] = useState([])
  const [themesList, setThemesList] = useState([])
  const [collectionsList, setCollectionsList] = useState([])
  const [isFirstRender, setIsFirstRender] = useState(true)
  const {
    handleValueChange,
    handleSubmit,
    editedData,
    hasChanges
  } = useMyAccountSettings(userData)

  const [socialNetworkAdvertising, setSocialNetworkAdvertising] = useState(editedData.store.social_network_advertising.split(',').map(item => item.trim()))
  const [collections, setCollections] = useState(editedData.store.collections)

  useEffect(() => {
    if (hasChanges) {
      if (isFirstRender) {
        setIsFirstRender(false)
      } else {
        handleSubmit({})
      }
    }
  }, [hasChanges, isFirstRender])

  useEffect(() => {
    handleApiGet()
  }, [])

  function handleApiGet () {
    setApiRequestLanguagesState(REQUEST_STATE_LOADING)
    setApiRequestThemesState(REQUEST_STATE_LOADING)
    setApiRequestCollectionsState(REQUEST_STATE_LOADING)
    GetLanguages()
      .then((result) => {
        setLanguageList(result.data)
        setApiRequestLanguagesState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestLanguagesState(REQUEST_STATE_ERROR)
      })
    GetThemes()
      .then((result) => {
        setThemesList(result.data)
        setApiRequestThemesState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestThemesState(REQUEST_STATE_ERROR)
      })
    GetCollections()
      .then((result) => {
        setCollectionsList(result.data)
        console.log(result.data)
        setApiRequestCollectionsState(REQUEST_STATE_SUCCESS)
      })
      .catch(() => {
        setApiRequestCollectionsState(REQUEST_STATE_ERROR)
      })
  }

  const handleSocialNetworkAdvertising = (e) => {
    const { name, checked } = e.target

    const updatedArray = [...socialNetworkAdvertising]

    const index = updatedArray.indexOf(name)

    if (checked && index === -1) {
      updatedArray.push(name)
    } else if (!checked && index !== -1) {
      updatedArray.splice(index, 1)
    }

    handleValueChange({
      name: 'store.social_network_advertising',
      value: updatedArray.join(', ')
    })

    setSocialNetworkAdvertising(updatedArray)
  }

  const handleCollections = (e) => {
    const { name, checked } = e.target

    const updatedArray = [...collections]

    const index = updatedArray.findIndex(item => item.id === name)

    if (!checked && index === -1) {
      updatedArray.push({ id: name })
    } else if (checked && index !== -1) {
      updatedArray.splice(index, 1)
    }

    handleValueChange({
      name: 'store.collections',
      value: updatedArray
    })

    setCollections(updatedArray)
  }

  const handleWhatsappChange = (e) => {
    const { checked } = e.target
    let value = ''

    if (checked) {
      value = editedData.store.store_phone
    }

    handleValueChange({
      name: 'store.whatsapp',
      value
    })
  }

  return (
    <TabPanel value='/users/my-account/store-settings' sx={{ p: 0 }}>
      <BoxShadow>
        <BoxShadowHeader title='Store Information' subtitle='Información básica de tu tienda' />
        <InputsBox columns={1}>
          <InputBasic label='Referral Link' sublabel='Comparte este link para que se registren a tu nombre y obtener parte de las ganancias.' icon={<CopyToClipboardButton value={`https://${storeData.subdomain}.ventadirekta.com/referrals-register?utm_source=web`} />} value={`https://${storeData.subdomain}.ventadirekta.com/referrals-register?utm_source=web`} fullWidth readOnly />
        </InputsBox>
        <InformationButton label='Store Name' href='store-name' value={editedData.store.store_name} />
        <InformationButton label='Store Subdomain' href='store-name' value={editedData.store.subdomain} />
        <InformationButton label='Store Initials' href='store-name' value={editedData.store.store_name_initials} />
        <InformationButton label='Store Email' href='store-email' value={editedData.store.store_email} />
        <InformationButton label='Store Phone' href='store-phone' value={editedData.store.store_phone} />
        {apiRequestLanguagesState === REQUEST_STATE_SUCCESS && (
          <InformationButton label='Store Language' href='store-language' value={languageList.length > 0 && languageList.find((item) => item.code === editedData.store.language).name} />
        )}
        <InformationButton label='Show Discount' href='store-show-discount' value={editedData.store.show_discount} />
        {apiRequestThemesState === REQUEST_STATE_SUCCESS && (
          <InformationButton label='Store Colors' href='store-colors' value={StoreColorDots({ theme: themesList && themesList.find((item) => item.name === editedData.store.theme_color) })} />
        )}
        <InformationButton label='Verified Status' href='store-status' value={<Chip label={editedData.store.verified ? 'Verified' : 'Not-verified'} color={editedData.store.verified ? 'success' : 'info'} />} />
        <InformationButton label='Store Status' href='store-status' value={<Chip label={editedData.store.status} color={editedData.store.status ? 'success' : 'info'} />} />
      </BoxShadow>
      <BoxShadow sx={{ marginTop: 2 }}>
        <BoxShadowHeader title='Social Network' subtitle='Información sobre tus redes sociales' />
        <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif' marginTop={2}>
          Agrega las redes sociales que se mostrarán en tu tienda
        </Typography>
        <InformationButton label='Facebook' href='store-social-network' value={editedData.store.facebook} />
        <InformationButton label='Instagram' href='store-social-network' value={editedData.store.instagram} />
        <InformationButton label='Twitter' href='store-social-network' value={editedData.store.twitter} />
        <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif' marginBottom={1} marginTop={2}>
          ¿Que redes sociales utilizarás para promocionar tu tienda?
        </Typography>
        <FormGroup row>
          <FormControlLabel control={<Checkbox checked={socialNetworkAdvertising.includes('Instagram')} name='Instagram' onChange={handleSocialNetworkAdvertising} />} label='Instagram' labelPlacement='end' color='primary' />
          <FormControlLabel control={<Checkbox checked={socialNetworkAdvertising.includes('Facebook')} name='Facebook' onChange={handleSocialNetworkAdvertising} />} label='Facebook' labelPlacement='end' color='primary' />
          <FormControlLabel control={<Checkbox checked={socialNetworkAdvertising.includes('Pinterest')} name='Pinterest' onChange={handleSocialNetworkAdvertising} />} label='Pinterest' labelPlacement='end' color='primary' />
          <FormControlLabel control={<Checkbox checked={socialNetworkAdvertising.includes('TikTok')} name='TikTok' onChange={handleSocialNetworkAdvertising} />} label='TikTok' labelPlacement='end' color='primary' />
        </FormGroup>
        <Stack direction='row' spacing={1} alignItems='center' marginTop={1}>
          <AntSwitch name='whatsapp' checked={editedData.store.whatsapp !== ''} onChange={handleWhatsappChange} inputProps={{ 'aria-label': 'ant design' }} />
          <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif' marginBottom={1}>
            Mostrar link a Whatsapp
          </Typography>
        </Stack>
      </BoxShadow>
      <BoxShadow sx={{ marginTop: 2 }}>
        <BoxShadowHeader title='Banners' subtitle='Agregar banners personalizados para tu inicio de tienda' />
        <InformationButton
          label='Desktop Banner' href='store-banners' value={
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={6}>
                <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif' noWrap>
                  {editedData.store.home_banner.desktop.link.split('.com/')[1]}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <img src={validProductionAdminUrl({ url: editedData.store.home_banner.desktop.image })} alt={editedData.store.home_banner.desktop.link} style={{ width: 'auto', maxHeight: '100px' }} />
              </Grid>
            </Grid>
          }
        />
        <InformationButton
          label='Mobile Banner' href='store-banners' value={
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={6}>
                <Typography variant='h6' fontWeight={400} fontSize={14} fontFamily='Montserrat, sans-serif' noWrap>
                  {editedData.store.home_banner.movil.link.split('.com/')[1]}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <img src={validProductionAdminUrl({ url: editedData.store.home_banner.movil.image })} alt={editedData.store.home_banner.movil.link} style={{ width: 'auto', maxHeight: '100px' }} />
              </Grid>
            </Grid>
          }
        />
      </BoxShadow>
      {apiRequestCollectionsState && (
        <BoxShadow sx={{ marginTop: 2 }}>
          <BoxShadowHeader title='Collections' subtitle='Estas son las colecciones que serán visibles en tu tienda' />
          <FormGroup row>
            {collectionsList.map((collection) => {
              return (
                <FormControlLabel key={collection.handle} control={<Checkbox checked={!editedData.store.collections.find((item) => item.id === collection.shopify_id)} name={collection.shopify_id} onChange={handleCollections} />} label={collection.name} labelPlacement='end' color='primary' />
              )
            })}
          </FormGroup>
        </BoxShadow>
      )}
    </TabPanel>
  )
}
