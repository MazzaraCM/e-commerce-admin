import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { GridColDef, GridRowModel } from '@mui/x-data-grid'

type FormattedColumnsAndRows = {
    formattedColumns: GridColDef[];
    formattedRows: GridRowModel[];
};

type EmptyColumnsAndRows = {
  formattedColumns: GridColDef[];
  formattedRows: GridRowModel[];
};

export function useDataGridTable () {
  const columnsAndRowsFormatting = ({ columns, rows, identifier } : {columns: GridColDef[], rows: object[], identifier: string}): FormattedColumnsAndRows | EmptyColumnsAndRows => {
    if (rows.length > 0) {
      const formattedColumns: GridColDef[] = columns.map((column) => ({ field: column.field, headerName: column.headerName }))

      const formattedRows: GridRowModel[] = rows.map((item) => {
        const row = { id: item[identifier] }
        columns.forEach((column) => {
          row[column.field] = item[column.field]
        })
        return row
      })

      return ({ formattedColumns, formattedRows })
    } else {
      return ({ formattedColumns: columns, formattedRows: rows })
    }
  }
  const TableSkeleton = ({ numberOfItems }) => {
    return (
      <Stack spacing={1}>
        <Skeleton variant='rounded' height={60} />
        <Stack spacing={1} direction='row'>
          <Skeleton variant='rectangular' width={50} sx={{ height: 30 * numberOfItems / 2 }} />
          <Skeleton variant='rectangular' sx={{ width: '100%', height: 30 * numberOfItems / 2 }} />
        </Stack>
      </Stack>
    )
  }

  const getRowsSelected = ({ rows, ids }) => {
    return rows.filter((row) => ids.includes(row.id.toString()))
  }

  return { columnsAndRowsFormatting, TableSkeleton, getRowsSelected }
}
