import PaymentSelector from '../../components/PaymentSelector'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../../redux/actions/index'
import { useToast, Button, Flex, Heading } from '@chakra-ui/react'
import { createMercadoPagoPreferences } from '../../services/payments'
import { useEffect } from 'react'

export default function Payment () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentOrderStatus = useSelector(state => state.order)
  const paymentID = useSelector(state => state.order.userPaymentId)
  const cartProducts = useSelector(state => state.cartProducts)
  const userAddresses = useSelector(state => state.user.userAddresses)
  const toast = useToast()
  const user = useSelector(state => state.user)

  const link = () => {
    navigate('/addresses')
  }

  useEffect(() => {
    if (!currentOrderStatus.userAddressId || !currentOrderStatus.orderItems) navigate('/')
  }, [])//eslint-disable-line

  async function handleClick (e) {
    if (e.target.name === 'payment') return navigate('/createpayment')
    if (!paymentID) {
      return toast({
        description: 'Debe seleccionar un método de pago.',
        status: 'error',
        duration: 2500,
        isClosable: true
      })
    }
    if (paymentID === 'MP') {
      try {
        const preferences = await createMercadoPagoPreferences()
        window.location.replace(preferences.init_point)
      } catch (error) {
        console.log(error)
      }
    } else {
      dispatch(placeOrder())
      navigate('/confirmation')
    }
  }

  return (
    <>
      <IoMdArrowRoundBack size={30} _hover={{ bg: 'black' }} onClick={link} cursor='pointer' />
      {user.id !== undefined && cartProducts.length !== 0 && userAddresses.length !== 0
        ? <Flex h='100%'>
          <PaymentSelector>
            <Button name='payment' mr={3} colorScheme='blue' onClick={handleClick}>Agregar método de pago</Button>
            <Button name='buy' colorScheme='blue' onClick={handleClick}>Comprar</Button>
          </PaymentSelector>
          {/*  eslint-disable-next-line */}
          </Flex>
        : <Flex justifyContent='center'><Heading>Error 404</Heading></Flex>}
    </>

  )
}
