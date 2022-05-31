import { Box, Flex, Divider, Button, Text, VisuallyHidden, UnorderedList, ListItem } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCart } from '../../redux/actions/cart.actions'
import { clearCreatedOrder, getOrderDetails } from '../../redux/actions/orders.actions'
import AddressCard from '../AddressCard'
import UserPaymentCard from '../PaymentCard'

import { BsFillCheckCircleFill } from 'react-icons/bs'

export default function OrderConfirmation () {
  const dispatch = useDispatch()
  const createdOrder = useSelector(state => state.orders.orderDetails)
  const navigate = useNavigate()
  const { userPayment, userAddress, branch } = createdOrder
  const { orderId } = useParams()

  useEffect(() => {
    dispatch(getOrderDetails(orderId))
    dispatch(updateCart([]))
    return () => {
      dispatch(clearCreatedOrder())
    }
  }, []) //eslint-disable-line

  function handleClick () {
    navigate('/')
  }

  return (
    <Flex flexDirection='column' alignItems='center' justifyContent='center'>
      <Flex h='150px' w='100%' bg='success'><VisuallyHidden>asdas</VisuallyHidden></Flex>
      <Flex w='37rem' position='relative' top='-100px' flexDirection='column' mt='1rem' mb='1rem' bg='white' border='1px' borderColor='secondary' borderRadius='5px' boxShadow='md'>
        <Flex bg='white' justifyContent='center' borderRadius='5px 5px 0px 0px'>
          <Flex alignItems='center' flexDirection='column' mt='2rem' mb='2rem'>
            <BsFillCheckCircleFill size='100px' color='#38a169' />
            <Text fontSize='1.5rem' color='black' mt='1rem'>¡Gracias por tu compra!</Text>
          </Flex>
        </Flex>
        <Box p='1rem'>

          {createdOrder.id && <div>
            <Divider />
            <Text mb='1rem' fontWeight={500}>Nº de orden</Text>
            <Text mb='1rem'>{createdOrder.id}</Text>
            <Divider />
            <Text mt='1rem' fontWeight={500}>Pagaste con</Text>
            <UserPaymentCard
              key={userPayment.id}
              paymentType={userPayment.paymentType}
              cardNumber={userPayment.cardNumber}
              expirationDate={userPayment.expirationDate}
              provider={userPayment.provider}
              id={userPayment.id}
            />
            <Divider />
            {userAddress && <Text mt='1rem' fontWeight={500}>Recibirás tu compra en </Text>}
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
            <Divider />
            <Text mt='1rem' fontWeight={500}>Compraste</Text>
            <UnorderedList mt='1rem'>
              {createdOrder.products && createdOrder.products.map((item, index) =>
                <ListItem color='black' key={index}>{item.name}</ListItem>)}
            </UnorderedList>
            <Flex mt='1rem' justifyContent='flex-end'>
              <Button border='1px' borderColor='white' _hover={{ color: 'white' }} bg='success' color='white' onClick={handleClick}>Aceptar</Button>
            </Flex>

            {/* eslint-disable-next-line */}
        </div>}
        </Box>
      </Flex>
    </Flex>
  )
}
