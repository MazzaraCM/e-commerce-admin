import { GridColDef } from '@mui/x-data-grid'

export const Columns: GridColDef[] = [
  {
    field: 'full_name',
    type: 'string',
    headerName: 'Name',
    flex: 1
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    flex: 1
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Phone',
    flex: 1
  },
  {
    field: 'form',
    type: 'string',
    headerName: 'Category',
    flex: 0.6,
    valueGetter (item) {
      return item.value[0].answer
    }
  },
  {
    field: 'date_created',
    type: 'date',
    headerName: 'Date',
    flex: 0.6,
    valueGetter (item) {
      return new Date(item.value)
    }
  }
]

export const ColumnsNotVisible = {
}
