import LinearProgress from '@mui/material/LinearProgress'
import './style.css'

export function LoaderBasic () {
  return (
    <div className='landing-pre-loader-div'>
      <div className='landing-pre-loader'>
        <img src='https://ventadirekta.com/assets/images/logo/logo-white.webp' alt='' />
        <LinearProgress style={{ color: 'white', background: 'black', width: '100%' }} />
      </div>
    </div>
  )
}
