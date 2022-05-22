import { Box, ListItem, UnorderedList, Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCreatedOrder } from '../../redux/actions'
import AddressCard from '../AddressCard'
import UserPaymentCard from '../PaymentCard'
import { getOrderDetails } from '../../redux/actions/orders.actions'
// import LoadingSpinner from '../LoadingSpinner'

export default function OrderConfirmation () {
  const dispatch = useDispatch()
  const createdOrder = useSelector(state => state.orderDetails)
  const navigate = useNavigate()
  const { userPayment, userAddress, branch } = createdOrder
  const { orderId } = useParams()

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
    return () => {
      dispatch(clearCreatedOrder())
    }
  }, []) //eslint-disable-line

  function handleClick () {
    navigate('/')
  }

  return (
    <Box>
      {createdOrder?.id
        ? <div>
          <p>Nro. de Orden: {createdOrder.id}</p>
          <p>Fue pagado con:</p>
          <UserPaymentCard
            key={userPayment.id}
            paymentType={userPayment.paymentType}
            cardNumber={userPayment.cardNumber}
            expirationDate={userPayment.expirationDate}
            provider={userPayment.provider}
            id={userPayment.id}
          />
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
          <Button onClick={handleClick}>Aceptar</Button>
          {/* eslint-disable-next-line */}
        </div>
        : <p>A</p>}
    </Box>
  )
}
