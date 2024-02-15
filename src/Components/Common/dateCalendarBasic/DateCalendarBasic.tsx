import React, { JSXElementConstructor } from 'react'
import Button from '@mui/material/Button'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DateView } from '@mui/x-date-pickers'
import moment from 'moment'

type CallbackFunction = (arg: string) => void;

export function DateCalendarBasic ({
  callback,
  views = ['day', 'month', 'year'],
  callbackFormat,
  openTo,
  showText = true,
  showIcon = true,
  disableFuture = true,
  disablePast = false,
  customText,
  customSelector,
  minDate,
  maxDate
} : {
  callback : CallbackFunction,
  views: Array<'year' | 'month' | 'day'>,
  callbackFormat: string,
  openTo: DateView,
  showText?: boolean,
  showIcon?: boolean,
  disableFuture?: boolean,
  disablePast?: boolean,
  customText?: JSXElementConstructor,
  customSelector?: JSXElementConstructor,
  minDate?: Date
  maxDate?: Date
}) {
  const [selectedDate, setSelectedDate] = React.useState<string>('')
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleOpenDateChange = () => {
    setIsDatePickerOpen(!isDatePickerOpen)
    setIsDialogOpen(!isDialogOpen)
  }

  const handleCallback = () => {
    callback(selectedDate)
    handleOpenDateChange()
  }

  return (
    <>
      {customSelector
        ? (
          <div onClick={handleOpenDateChange}>
            {customSelector}
          </div>
          )
        : (
          <Button onClick={handleOpenDateChange}>
            {showIcon && (<CalendarMonthOutlinedIcon />)}
            {showText && ('Date')}
            {customText}
          </Button>
          )}
      {isDatePickerOpen && (
        <Dialog open={isDialogOpen} onClose={handleOpenDateChange}>
          <DialogContent>
            <DateCalendar
              openTo={openTo}
              views={views}
              disableFuture={disableFuture}
              disablePast={disablePast}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date: Date | null) => handleDateChange(moment(date).format(callbackFormat))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpenDateChange}>Cancel</Button>
            <Button onClick={handleCallback}>Accept</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}
