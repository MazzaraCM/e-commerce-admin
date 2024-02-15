import { useLanguage } from '../../../Context/languages'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import './style.css'

export function LanguageSelect () {
  const { locale, changeLanguage } = useLanguage()

  const handleChange = (event) => {
    changeLanguage(event.target.value)
  }

  return (
    <FormControl id='language-select-control' variant='standard'>
      <Select
        labelId='language-select-label'
        id='language-select'
        value={locale}
        label='Language'
        onChange={handleChange}
      >
        <MenuItem value='en'>
          <img width={30} loading='lazy' alt='🇺🇸' src='data:image/png;base64,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' />
        </MenuItem>
        <MenuItem value='es'>
          <img width={30} loading='lazy' alt='🇨🇴' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAEXUExURUdwTL6uXW8PGmsVH452DWQRG8O0b4JpQ3VPLaWOJWYTHGQUHMa2dcKxaMq4awohUGEPGBQ1aocfKmQSG8S0bcKyaWANFsq5csm5c8O0bcSzb1ldTbKcQaCcYiVVovbTNfzYOdKvFNi0F6wRIt25GwY2gwIuffrWOOnFKRxLmuTAIdEzRe7LLPPPMA4+irYWJxJEkuC9JLwfMMosPsMnOYMVIc8wQdO0KK0kMw5Ip98sOJYhL2sNGNjCY8UYJpgQH+PJTRFWqsiwRrecKAEylv7jKKKHDvDQRDc/e9G6UMCgE09hc+vABhk3ePnPC/7bLU9fjQQkXksxaZqfZ7Y2UGxHfHOGeoxAaW1pUp85WW8oT5OISgEYZxiJwJ4AAAAedFJOUwD8sPGuXSsHC6HXNxjg9a0aoqKEfcecsFqXSqLY8esXM8cAAAO5SURBVFjD7ddpU9pQGAVglSKRrbTg2hmWECAJJBjCKhYQpAUVsYjV2v7/39H3vfdmJYHaT50OB5cZJI/nXHAGd3a22WabfzJcNLpPE41GQ39FRPfPTlKnx4ex+C5N7PA0dbIfeptxcnoci8c/Y6aQIQ3RUvvGw0KcvxoCI2UYA4w4EDVNa7EMwTzgjNkHB2ceDTnYkjo+pDVA+IpRKiI4As/ncrmbXK7V0lqjA+Na7t2I7D2DA+RCcIbmYbAeKJS+ZkoZRakAJGuCgBCGd0JfRmTvbiwWO4TPeNyawhAWBrFKEFejLzc4FzIdTkkGU4ZknFEUFyS4IZyL0abaQBuIYgWiVBSFXl+it5JZaR0Ee3lBE+AZkWVRJBRzCIFfGCSTQ+LXQbwgrDglW8xtBsT7NUJHkw2HSCVa6A0QKSSsK2Rt2wAJ5rIKbWQ6WfYFIZFB/B9CxjBGZLMGtKmRedQuKEtvJA6I3wTRI7IKZa24G/G+kEAb2Y/I7mT/rJHpOJZlVxvZKvlBwnooO4fcQ+5o8Fd7Q7IvNB+Px/PMYLr7+P2W5OXl5eeIv7uXNzdSGATEODMA4SGd7nSuSYp4KxZntz+HN3aIviZWzmg+t4wO5ErCnKtqoVAkKVxfq5NPJvT+ZSSQxbLMnjSFEOPMFIkrJNI06BDIkFS1+MGCfhUnMLgl393TVMTp8JHVMAhPqADQzAZ9I3fOJhN6jg8TScIlnfRKLIhK6ioEP7o20jmXzuGStLQG8m+EFNyvnmMkHyftbOQFFZijMgal9F81skHGMp9pViW/RqoJeTW6wnQkaYKZQegVno3Mba5DQiL98PT0/GO5rPcw1Xy+331dLKDcxkbUYcbzsnxBovd69V6Vpddrvy4cUIFFtZ62KwkJm1Eul5tNvV6v12pVKESC1EcT2ms0Xhezggp/OAQhL0ZJesAlZUbQNHUdHRtUa3ftUL5a7eLiBTnIBQg/lnrzwoHQQjotZEhuqE9KGrm4gA+9qTebZVcsKO8L4b2QWg0eCedQ13WAXBQ4rml5LwgZgGqGQyTvQsTo+zSqskaW5BhHkHq73e52+/1Gv9HoY/Jtr0Z5wwFJN7fREyZCtwG5tAW4rs8ZObfpdiMQCITDe0fJIEkyeRQOEMsGXUJPgNq2RiSUQAOEZDASSZBrzHfAiUhwL3y5Z749PqIlcXK+DatJupQAgxLeb8MBCwYtOHgUposxffqNLEEjwe284d8ELgiTw+EADTuKyJsIW89EIkKT4Ownsc022/yP+Q1RqMEG/cI8wwAAAABJRU5ErkJggg==' />
        </MenuItem>
      </Select>
    </FormControl>
  )
}
