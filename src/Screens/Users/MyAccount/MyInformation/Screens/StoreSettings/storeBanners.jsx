import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import { InputsBox } from '../../../../../../Components/Common/inputsBox/inputsBox'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { useOutletContext } from 'react-router-dom'
import { InformationButton } from '../../../../../../Components/Common/informationButton/informationButton'
import { useStore } from '../../../../../../Hooks/Models/store'
import { useMessageHandler } from '../../../../../../Hooks/handlerMessages'
import imagePlaceholder from '../../../../../../Public/Assets/Images/image-placeholder.jpg'
import { validProductionAdminUrl } from '../../../../../../Utils/utils'

import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

function TextFieldBox ({ children }) {
  return (
    <Box component='div' sx={{ '& > :not(style)': { m: 1 }, justifyContent: 'center', display: 'flex', width: '100%' }}>
      {children}
    </Box>
  )
}

function BannerDialog ({ onClose, open, defaultImage, bannerType, title, editedData, handleInputChange, Buttons, handleSubmit }) {
  const [image, setImage] = useState(defaultImage)
  const { UploadBanner, RemoveBanner } = useStore()
  const { toastHandler } = useMessageHandler()

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    const imageUrl = URL.createObjectURL(file)

    setImage({
      file,
      imageUrl
    })

    handleUploadBanner(file)
  }, [])

  const { getRootProps, open: openImageSelect } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    onDrop
  })

  const handleClose = () => {
    onClose()
  }

  const handleUploadBanner = (file) => {
    UploadBanner({ subdomain: editedData.store.subdomain, type: bannerType, file }).then(() => {
      toastHandler({ message: 'Banner actualizado con éxito', type: 'success' })
    })
  }

  const handleRemoveBanner = () => {
    RemoveBanner({ subdomain: editedData.store.subdomain, type: bannerType }).then(() => {
      setImage({
        file: undefined,
        imageUrl: undefined
      })
      toastHandler({ message: 'Banner eliminado con éxito', type: 'success' })
    })
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle display='flex' alignItems='center' justifyContent='space-between'>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Typography fontWeight={400} fontSize={16} fontFamily='Montserrat, sans-serif'>
          {title}
        </Typography>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ maxWidth: '500px', minHeight: '400px' }}>
        <BoxShadowHeader title='' subtitle={`Este es el banner que verán tus clientes al entrar en la versión ${bannerType}`} />
        <Divider sx={{ my: 2 }} />
        <BoxShadowHeader title='' subtitle='Asegúrate de agregar un link válido al que tus clientes accederán si hacen click en el banner' />
        <Box autoComplete='off' display='flex' flexDirection='column' alignItems='flex-end'>
          <form onSubmit={handleSubmit}>
            <TextFieldBox>
              <TextField
                autoFocus
                id={`${bannerType}Link`}
                label={`${title} Link`}
                type='text'
                variant='outlined'
                value={editedData.store.home_banner[bannerType]?.link}
                name={`store.home_banner.${bannerType}.link`}
                onChange={handleInputChange}
                fullWidth
              />
            </TextFieldBox>
            <Buttons />
          </form>
        </Box>
        <Divider sx={{ my: 2 }} />
        <BoxShadowHeader title='' subtitle={`Asegúrate que la imagen mantenga la resolución estándar de ${bannerType === 'desktop' ? '1200px x 600px' : '600px x 300px'}`} />
        <div {...getRootProps()} style={{ cursor: 'pointer' }}>
          {image.imageUrl
            ? (
              <img src={image.imageUrl} className={`upload_${bannerType}_banner`} alt='Preview' style={{ width: '100%' }} />
              )
            : (
              <img src={imagePlaceholder} className={`upload_${bannerType}_banner`} alt='Preview' style={{ width: '100%' }} />
              )}
        </div>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={openImageSelect} variant='outlined'>
          <CreateOutlinedIcon fontSize='small' sx={{ marginRight: 1 }} /> Cambiar
        </Button>
        <Button onClick={handleRemoveBanner} variant='outlined'>
          <DeleteOutlinedIcon fontSize='small' sx={{ marginRight: 1 }} /> Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function StoreBanners () {
  const userData = useOutletContext()

  const [openDesktopDialog, setOpenDesktopDialog] = useState(false)
  const handleClickOpenDesktopDialog = () => {
    setOpenDesktopDialog(true)
  }
  const handleCloseDesktopDialog = () => {
    setOpenDesktopDialog(false)
  }

  const [openMobileDialog, setOpenMobileDialog] = useState(false)
  const handleClickOpenMobileDialog = () => {
    setOpenMobileDialog(true)
  }
  const handleCloseMobileDialog = () => {
    setOpenMobileDialog(false)
  }

  const {
    editedData,
    handleValueChange,
    handleSubmit,
    handleInputChange,
    Buttons
  } = useMyAccountSettings(userData)

  return (
    <MyInformationEdit label='Store Banners'>
      <BoxShadowHeader title='' subtitle='Si añades un banner personalizado podría añadirle un atractivo distintivo a tu tienda' />
      <Box>
        <InputsBox columns={1}>
          <InformationButton
            clickeable={false}
            onClick={handleClickOpenDesktopDialog}
            icon=''
            label='Desktop Banner' value={
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
            clickeable={false}
            onClick={handleClickOpenMobileDialog}
            icon=''
            divider={false}
            label='Mobile Banner' value={
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
        </InputsBox>
      </Box>
      <BannerDialog
        open={openDesktopDialog}
        onClose={handleCloseDesktopDialog}
        defaultImage={{ imageUrl: editedData.store.home_banner.desktop.image ? validProductionAdminUrl({ url: editedData.store.home_banner.desktop.image }) : undefined }}
        bannerType='desktop'
        title='Desktop Banner'
        handleValueChange={handleValueChange}
        editedData={editedData}
        handleInputChange={handleInputChange}
        Buttons={Buttons}
        handleSubmit={handleSubmit}
      />
      <BannerDialog
        open={openMobileDialog}
        onClose={handleCloseMobileDialog}
        defaultImage={{ imageUrl: editedData.store.home_banner.movil.image ? validProductionAdminUrl({ url: editedData.store.home_banner.movil.image }) : undefined }}
        bannerType='movil'
        title='Mobile Banner'
        handleValueChange={handleValueChange}
        editedData={editedData}
        handleInputChange={handleInputChange}
        Buttons={Buttons}
        handleSubmit={handleSubmit}
      />
    </MyInformationEdit>
  )
}
