import { Box, ListItem, UnorderedList, Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCreatedOrder } from '../../redux/actions'
import AddressCard from '../AddressCard'
import UserPaymentCard from '../PaymentCard'
import LoadingSpinner from '../LoadingSpinner'

export default function OrderConfirmation () {
  const dispatch = useDispatch()
  const createdOrder = useSelector(state => state.createdOrder)
  const navigate = useNavigate()
  const { userPayment, userAddress, branch } = createdOrder

  useEffect(() => {
    return () => {
      dispatch(clearCreatedOrder())
    }
  }, []) //eslint-disable-line

  function handleClick () {
    navigate('/')
  }

  return (
    <Box>
      {createdOrder.orderId
        ?//eslint-disable-line 
          <div>
            <p>Nro. de Orden: {createdOrder.orderId}</p>
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
              {createdOrder.orderItems.map(item => <ListItem key={item.productId}>{item.name}</ListItem>)}
            </UnorderedList>
            <Button onClick={handleClick}>Aceptar</Button>
          </div>
        : <LoadingSpinner />}
    </Box>
  )
}
