import React, { useState, ReactNode } from 'react'
import {
  GridColumnVisibilityModel,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridCsvExportOptions,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridSortDirection,
  GridColDef
} from '@mui/x-data-grid'
import { JsonExportMenuItem } from './JsonExportMenuItem'
import { backgroundMain, textStatic } from '../../../Themes/colors'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import { CustomNoRowsOverlay } from './customNoRows'
import { DataGridStyled } from './muyStyles'
import { useSearch } from '../../../Hooks/search'
import { BoxShadowHeader } from '../boxShadowHeader/boxShadowHeader'

type SortModel = {
  field: string;
  sort: GridSortDirection;
};

interface DataGridTableProps {
  rows: Array<object>;
  columns: GridColDef[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSelectionChange?: Function;
  title?: string;
  subtitle?: string;
  initPageSize?: number;
  checkboxSelection?: boolean;
  columnsNotVisible?: GridColumnVisibilityModel;
  sortModel?: SortModel[];
  calendar?: boolean;
  CalendarWidget?: ReactNode;
  CustomButtons?: ReactNode;
  showSearch?: boolean;
  showPagination?: boolean;
  showHeader?: boolean;
  showToolbarButtons?: boolean;
  toolbarButtons?: Array<'filters' | 'columns' | 'density' | 'export'>;
  sx?: object;
  iconTitle?: ReactNode;
}

function TableToolbar ({ title, subtitle, iconTitle, handleSearchChange, showSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
    handleSearchChange(value)
  }
  return (
    <Toolbar sx={{ pl: { sm: 0 }, pr: { xs: 0 }, display: 'flex', direction: 'row', justifyContent: 'space-between' }}>
      <BoxShadowHeader title={title} subtitle={subtitle} iconTitle={iconTitle} />
      {showSearch && (
        <div>
          <Tooltip title='Search'>
            <div style={{ padding: '10px' }} className='inputBasic'>
              <input id='dataGridTableSearchInput' type='text' value={searchTerm} onChange={(e) => handleSearch(e.target.value)} placeholder='Search...' style={{ backgroundColor: backgroundMain(), color: textStatic() }} />
            </div>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  )
}

function ButtonsToolbar ({ calendar, CalendarWidget, CustomButtons, toolbarButtons, title }) {
  const csvOptions: GridCsvExportOptions = { delimiter: ';', utf8WithBom: true, fileName: title }
  const jsonOptions = { fileName: title }

  return (
    <GridToolbarContainer sx={{ justifyContent: 'start' }}>
      {toolbarButtons.includes('filters') && (
        <GridToolbarFilterButton sx={{ color: textStatic() }} />
      )}
      {toolbarButtons.includes('columns') && (
        <GridToolbarColumnsButton sx={{ color: textStatic() }} />
      )}
      {toolbarButtons.includes('density') && (
        <GridToolbarDensitySelector sx={{ color: textStatic() }} />
      )}
      {toolbarButtons.includes('export') && (
        <GridToolbarExportContainer sx={{ color: textStatic() }}>
          <GridCsvExportMenuItem options={csvOptions} />
          <JsonExportMenuItem options={jsonOptions} />
        </GridToolbarExportContainer>
      )}
      {calendar && (
        <CalendarWidget />
      )}
      {CustomButtons}
    </GridToolbarContainer>
  )
}

export function DataGridTable ({
  rows,
  columns,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelectionChange = (_: typeof rows) => {},
  title,
  subtitle,
  initPageSize = 5,
  checkboxSelection = false,
  columnsNotVisible = {},
  sortModel = [] as SortModel[],
  calendar = false,
  CalendarWidget = <></>,
  CustomButtons = [],
  showSearch = true,
  showPagination = true,
  showHeader = true,
  showToolbarButtons = true,
  toolbarButtons = ['filters', 'columns', 'density', 'export'],
  sx = {},
  iconTitle
}: DataGridTableProps) {
  const { basicSearch } = useSearch()
  const [filterSearch, setFilterSearch] = useState('')
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(columnsNotVisible)

  const handleSelectionChange = (newRowSelectionModel) => {
    onSelectionChange(newRowSelectionModel)
  }

  const handleSearchChange = (searchString) => {
    setFilterSearch(searchString)
  }

  const filteredRows = rows?.length > 0 ? basicSearch({ array: rows, searchChange: filterSearch }) : []

  return (
    <>
      {(title || subtitle || showSearch) && (
        <TableToolbar title={title} subtitle={subtitle} iconTitle={iconTitle} showSearch={showSearch} handleSearchChange={handleSearchChange} />
      )}
      <DataGridStyled
        showHeader={showHeader}
        showPagination={showPagination}
        autoHeight
        rows={filteredRows}
        columns={columns}
        onRowSelectionModelChange={(newRowSelectionModel) => handleSelectionChange(newRowSelectionModel)}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: initPageSize }
          },
          sorting: {
            sortModel
          }
        }}
        disableRowSelectionOnClick={!checkboxSelection}
        disableColumnMenu
        slots={{
          toolbar: () => showToolbarButtons ? <ButtonsToolbar calendar={calendar} CalendarWidget={() => CalendarWidget} CustomButtons={CustomButtons} toolbarButtons={toolbarButtons} title={title} /> : <></>,
          noRowsOverlay: CustomNoRowsOverlay,
          noResultsOverlay: CustomNoRowsOverlay
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection={checkboxSelection}
        localeText={{
          toolbarFilters: 'Filters',
          toolbarColumns: 'Columns',
          toolbarDensity: 'Density'
        }}
        sx={sx}
      />
    </>
  )
}
