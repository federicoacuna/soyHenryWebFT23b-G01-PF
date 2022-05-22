import PaymentSelector from '../../components/PaymentSelector'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../../redux/actions/index'
import { useToast, Button, Flex/* , Heading */ } from '@chakra-ui/react'
import { createMercadoPagoPreferences } from '../../services/payments'
import { useEffect } from 'react'

export default function Payment () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentOrderStatus = useSelector(state => state.order)
  // const paymentID = useSelector(state => state.order.userPaymentId)
  // const cartProducts = useSelector(state => state.cartProducts)
  // const userAddresses = useSelector(state => state.user.userAddresses)
  const toast = useToast()
  // const user = useSelector(state => state.user)

  const link = () => {
    navigate('/addresses')
  }

  useEffect(() => {
    if (!currentOrderStatus.userAddressId || !currentOrderStatus.orderItems) navigate('/')
  }, [])//eslint-disable-line

  async function handleClick (e) {
    if (e.target.name === 'payment') return navigate('/createpayment')
    if (!currentOrderStatus.paymentType) {
      return toast({
        description: 'Debes seleccionar un método de pago.',
        status: 'error',
        duration: 2500,
        isClosable: true
      })
    }

    if (currentOrderStatus.paymentType.id === 3) {
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
      <Flex h='100%'>
        <PaymentSelector>
          <Button name='payment' m={3} _hover={{ color: 'white' }} color='white' bg='button' onClick={handleClick}>Agregar método de pago</Button>
          <Button name='buy' m={3} _hover={{ color: 'white' }} color='white' bg='button' onClick={handleClick}>Comprar</Button>
        </PaymentSelector>
      </Flex>
    </>
  )
}
