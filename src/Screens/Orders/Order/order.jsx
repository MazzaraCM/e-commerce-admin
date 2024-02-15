import { OrderDetail } from '../../../Components/Common/orderDetail/orderDetail'
import { Main } from '../../../Components/Common/main/main'

export default function Order () {
  return (
    <Main>
      <OrderDetail method='api' />
    </Main>
  )
}
