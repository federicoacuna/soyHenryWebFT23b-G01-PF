import { Box, ListItem, UnorderedList, Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../../redux/actions/cart.actions'
import { getOrderDetails } from '../../redux/actions/orders.actions'
import AddressCard from '../AddressCard'
import s from './index.module.css'

export default function OrderConfirmation () {
  const dispatch = useDispatch()
  const createdOrder = useSelector(state => state.orders.orderDetails)
  const navigate = useNavigate()
  const { userAddress, branch } = createdOrder
  const { orderId } = useParams()

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
    dispatch(updateCart([]))
  }, []) //eslint-disable-line

  function handleClick () {
    navigate('/')
  }

  return (
    <div className={s.containerAll}>
      <div className={s.container}>
        <Box bg='success' p='1rem' borderRadius='0.8rem'>
          {createdOrder?.id
            ? <div>
              <p>Nro. de Orden: {createdOrder.id}</p>
              <p>Fue pagado con:</p>
              {userAddress && <p>Su orden sera despachada a:</p>}
              {
          userAddress &&
            <AddressCard
              id={userAddress.id}
              postalCode={userAddress.postalCode}
              streetName={userAddress.streetName}
              houseNumber={userAddress.houseNumber}
              city={userAddress.city}
              state={userAddress.state}
              country={userAddress.country}
            />
          }
              {branch && <p>Su orden estara disponible para su retiro en:</p>}
              {
          branch &&
            <AddressCard
              id={branch.id}
              streetName={branch.streetName}
              houseNumber={branch.houseNumber}
              city={branch.city}
              state={branch.state}
              country={branch.country}
            />
          }
              <UnorderedList>
                {createdOrder.orderItems.map((item, index) => <ListItem key={index}>{item.name}</ListItem>)}
              </UnorderedList>
              <Button border='1px' borderColor='white' _hover={{ color: 'white' }} bg='success' color='white' onClick={handleClick}>Aceptar</Button>
              {/* eslint-disable-next-line */}
        </div>
            : <p>A</p>}
        </Box>
      </div>

    </div>

  )
}
