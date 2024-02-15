import { useCallback, useState } from 'react'
import { BoxShadowHeader } from '../../../../../../Components/Common/boxShadowHeader/boxShadowHeader'
import useMyAccountSettings from '../../../../../../Hooks/myAccountSettings'
import MyInformationEdit from '../../MyInformationEdit'
import { PdfViewer } from '../../../../../../Components/Common/pdfViewer/pdfViewer'
import { useCustomer } from '../../../../../../Hooks/Models/customers'
import { useMessageHandler } from '../../../../../../Hooks/handlerMessages'
import { useOutletContext } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { validProductionAdminUrl } from '../../../../../../Utils/utils'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function W9 () {
  const userData = useOutletContext()
  const { UploadW9 } = useCustomer()
  const { toastHandler } = useMessageHandler()

  const {
    editedData
  } = useMyAccountSettings(userData)

  const defaultImage = { imageUrl: editedData.store.customer.format_w9 ? validProductionAdminUrl({ url: editedData.store.customer.format_w9 }) : undefined }

  const [image, setImage] = useState(defaultImage)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    const imageUrl = URL.createObjectURL(file)

    setImage({
      file,
      imageUrl
    })

    handleUploadW9(file)
  }, [])

  const { getRootProps } = useDropzone({
    accept: {
      'image/*': ['.pdf']
    },
    onDrop
  })

  const handleUploadW9 = (file) => {
    console.log(file)
    UploadW9({ file }).then(() => {
      toastHandler({ message: 'W9 actualizado con éxito', type: 'success' })
    })
  }

  console.log(editedData)

  return (
    <MyInformationEdit label='W9'>
      <BoxShadowHeader title='' subtitle='Información sobre tu W9' />
      <div {...getRootProps()} style={{ cursor: 'pointer', justifyContent: 'center', display: 'flex' }}>
        <Button>Subir W9</Button>
      </div>
      <Box sx={{ justifyContent: 'center', display: 'flex', mt: 2 }}>
        {image.imageUrl
          ? (
            <PdfViewer url={image.imageUrl} />
            )
          : (
            <PdfViewer url={validProductionAdminUrl({ url: editedData.store.customer.format_w9 })} />
            )}
      </Box>
    </MyInformationEdit>
  )
}
