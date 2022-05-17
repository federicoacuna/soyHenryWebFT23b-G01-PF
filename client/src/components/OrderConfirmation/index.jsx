import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCreatedOrder } from '../../redux/actions'
import LoadingSpinner from '../LoadingSpinner'
import PrimaryButton from '../ButtonPrimary'
import PaymentCard from '../PaymentCard'
import AddressCard from '../AddressCard'

export default function OrderConfirmation () {
  const dispatch = useDispatch()
  const createdOrder = useSelector(state => state.createdOrder)
  const navigate = useNavigate()

  useEffect(() => {
    return () => {
      dispatch(clearCreatedOrder())
    }
  }, []) //eslint-disable-line

  function handleClick () {
    navigate('/home')
  }

  return (
    <Box>
      {createdOrder.orderId &&
        <div>
          <p>Nro. de Orden: {createdOrder.orderId}</p>
          <UnorderedList>
            {createdOrder.orderItems.map(item => <ListItem key={item.productId}>{item.name}</ListItem>)}
          </UnorderedList>
          <p>Fue pagado con:</p>
          <PaymentCard />
          <p>Su orden sera despachada a:</p>
          <AddressCard />
          <PrimaryButton text='Aceptar' onclick={handleClick} />
        </div>}
      {createdOrder.orderId || <LoadingSpinner />}
    </Box>
  )
}
