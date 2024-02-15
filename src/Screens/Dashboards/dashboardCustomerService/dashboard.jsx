import { Main } from '../../../Components/Common/main/main'
import Grid from '@mui/material/Grid'
import { BoxShadow } from '../../../Components/Common/boxShadow/boxShadow'
import { BarChart } from '@mui/x-charts/BarChart'
import { LineChart } from '@mui/x-charts/LineChart'
import { PieChart } from '@mui/x-charts/PieChart'
import './style.css'

export default function DashboardCustomerService () {
  return (
    <Main className='dashboard'>
      <h1>DashboardCustomerService</h1>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <BoxShadow height={300}>
            <BarChart
              xAxis={[
                {
                  id: 'barCategories',
                  data: ['bar A', 'bar B', 'bar C'],
                  scaleType: 'band'
                }
              ]}
              series={[
                {
                  data: [2, 5, 3]
                }
              ]}
            />
          </BoxShadow>
        </Grid>
        <Grid item xs={4}>
          <BoxShadow height={300}>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
              series={[
                {
                  data: [2, 3, 5.5, 8.5, 1.5, 5, 1, 4, 3, 8],
                  showMark: ({ index }) => index % 2 === 0
                }
              ]}
            />
          </BoxShadow>
        </Grid>
        <Grid item xs={4}>
          <BoxShadow height={300}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' }
                  ]
                }
              ]}
            />
          </BoxShadow>
        </Grid>
      </Grid>
    </Main>
  )
}
