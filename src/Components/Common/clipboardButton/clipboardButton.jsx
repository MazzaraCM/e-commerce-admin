import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useMessageHandler } from '../../../Hooks/handlerMessages'

export function CopyToClipboardButton ({ value }) {
  const { errorHandler } = useMessageHandler()
  const [openTooltip, setOpenTooltip] = React.useState(false)

  const handleTooltipClose = () => {
    setOpenTooltip(false)
  }

  const handleTooltipOpen = () => {
    setOpenTooltip(true)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value)
      handleTooltipOpen()
    } catch (error) {
      return errorHandler({ errorMessage: 'Error al copiar al portapapeles', data: error, show: false })
    }
  }

  const handleButtonClick = () => {
    copyToClipboard()
  }

  return (
    <Tooltip
      onClose={handleTooltipClose}
      open={openTooltip}
      title='Copied!'
    >
      <IconButton onClick={handleButtonClick}>
        <ContentCopyIcon />
      </IconButton>
    </Tooltip>
  )
}
