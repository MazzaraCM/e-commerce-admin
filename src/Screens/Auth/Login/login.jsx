import { useState } from 'react'
import { useIntl } from 'react-intl'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'
import { InputBasic } from '../../../Components/Common/inputBasic/inputBasic'
import { backgroundMain, backgroundContrastText, textMain } from '../../../Themes/colors'
import { LogoImgByTheme } from '../../../Docs/images/logos'
import { userAuth } from '../../../Hooks/Models/userAuth'
import { Main } from '../../../Components/Common/main/main'
import './style.css'

export default function Login () {
  const [loading, setLoading] = useState(false)
  const { formatMessage: f } = useIntl()
  const { login } = userAuth()

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(!loading)

    const formData = event.target
    const { email, password, rememberMe } = formData
    const tokenExpiry = rememberMe.checked ? 30 : null
    login({ email: email.value, password: password.value, tokenExpiry }).catch(() => {
      setLoading(false)
    })
  }

  // TODO:
  // Validadciones de formulario

  return (
    <Main>
      <Card className='card login' style={{ backgroundColor: backgroundMain() }}>
        <LogoImgByTheme />
        <h6 style={{ color: textMain(), background: backgroundContrastText() }}>{f({ id: 'loginHello' })}</h6>
        <p>{f({ id: 'loginPleaseSignIn' })}</p>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              padding: 0,
              '& > :not(style)': { my: 1 }
            }}
            noValidate
            autoComplete='off'
          >
            <InputBasic name='email' autoComplete='email' type='email' label={f({ id: 'emailAddress' }).toUpperCase()} placeholder={f({ id: 'enterYourEmail' })} fullWidth required />
            <InputBasic name='password' autoComplete='current-password' type='password' label={f({ id: 'password' }).toUpperCase()} placeholder={f({ id: 'enterYourPassword' })} fullWidth required />
          </Box>
          <FormGroup row className='rememberme'>
            <FormControlLabel control={<Checkbox name='rememberMe' defaultChecked={false} />} label={f({ id: 'loginRememberMe' })} labelPlacement='end' color='primary' style={{ color: textMain() }} />
            <a href='#' className='loginForgotBtn' style={{ color: textMain() }}>
              {f({ id: 'loginForgotPassword' })}
            </a>
          </FormGroup>
          <LoadingButton loading={loading} className='fullWidth' variant='contained' type='submit'>
            {f({ id: 'loginSignIn' })}
          </LoadingButton>
        </form>
        <Divider className='divider' orientation='horizontal' flexItem>
          {f({ id: 'or' })}
        </Divider>
        <div className='socialButtons'>
          <Button variant='contained' startIcon={<GoogleIcon />} style={{ textAlign: 'center', backgroundColor: '#f6e3e0', color: '#d77768' }} className='button' />
          <Button variant='contained' startIcon={<TwitterIcon />} style={{ textAlign: 'center', backgroundColor: '#dfeffc', color: '#4c9feb' }} className='button' />
        </div>
      </Card>
    </Main>
  )
}
