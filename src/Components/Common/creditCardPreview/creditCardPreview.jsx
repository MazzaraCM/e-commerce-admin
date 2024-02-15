import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css'

export function CreditCardPreview ({ number, expiry, cvc, name, focus }) {
  return (
    <Cards
      number={number}
      expiry={expiry}
      cvc={cvc}
      name={name}
      focused={focus}
      preview
    />
  )
}
