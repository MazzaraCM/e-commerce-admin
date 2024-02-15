import * as React from 'react'
import {
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  GridApi,
  GridCsvExportOptions
} from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'

const getJson = (apiRef: React.MutableRefObject<GridApi>) => {
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef)
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef)

  const data = filteredSortedRowIds.map((id) => {
    const row: Record<string, unknown> = {}
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value
    })
    return row
  })

  return JSON.stringify(data, null, 2)
}

const exportBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()

  setTimeout(() => {
    URL.revokeObjectURL(url)
  })
}

export function JsonExportMenuItem ({ options } : {options: GridCsvExportOptions}) {
  const { fileName } = options
  const apiRef = useGridApiContext()

  return (
    <MenuItem
      onClick={() => {
        const jsonString = getJson(apiRef)
        const blob = new Blob([jsonString], {
          type: 'text/json'
        })
        exportBlob(blob, `${fileName}.json`)
      }}
    >
      Export JSON
    </MenuItem>
  )
}
