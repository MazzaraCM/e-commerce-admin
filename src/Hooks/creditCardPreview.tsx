import { useState } from 'react'

export function useCreditCardPreview () {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    focus: ''
  })

  const handleInputChange = (evt) => {
    const { name, value } = evt.target

    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }))
  }

  return { state, handleInputChange, handleInputFocus }
}
