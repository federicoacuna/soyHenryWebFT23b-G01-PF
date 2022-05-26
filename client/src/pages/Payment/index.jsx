import PaymentSelector from '../../components/PaymentSelector'//eslint-disable-line
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../../redux/actions/index'
// import { useToast, Button ,Flex , Heading  } from '@chakra-ui/react'//eslint-disable-line
import { createMercadoPagoPreferences } from '../../services/payments'
import { useEffect } from 'react'
import { Text, Button, Flex, useToast, RadioGroup, Radio, Stack, Box, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react' //eslint-disable-line

export default function Payment () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentOrderStatus = useSelector(state => state.order)
  const cartProducts = useSelector(state => state.cartProducts)
  console.log(cartProducts)

  // const paymentID = useSelector(state => state.order.userPaymentId)
  // const cartProducts = useSelector(state => state.cartProducts)
  // const userAddresses = useSelector(state => state.user.userAddresses)
  const toast = useToast()
  // const user = useSelector(state => state.user)

  useEffect(() => {
    if (!currentOrderStatus.userAddressId || !currentOrderStatus.orderItems) navigate('/')
  }, [])//eslint-disable-line

  async function handleClick (e) {
    if (e.target.name === 'payment') return navigate('/createpayment')
    if (!currentOrderStatus.paymentTypeId) {
      return toast({
        description: 'Debes seleccionar un método de pago.',
        status: 'error',
        duration: 2500,
        isClosable: true
      })
    }

    if (currentOrderStatus.paymentTypeId === 3) {
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

    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Breadcrumb mt='1rem' p='0rem 0rem 0rem 2rem' w='61.3rem' spacing='8px' separator='<'>
        <BreadcrumbItem>
          <BreadcrumbLink><Link to='/cart'>Carrito</Link></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink><Link to='/addresses'>Direcciones</Link></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink><Link to='#'>Pago</Link></BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex mb='2rem' ml='5.3rem' mr='5.3rem' w='61.3rem' justifyContent='space-between'>

        {/* column 1 */}
        <Flex w='30rem' p='2rem 2rem 0rem 2rem' flexDirection='column'>
          <Text mb='2.3rem' fontWeight={500} fontSize='larger'>Selecciona un método de pago</Text>
          <Flex flexDirection='column'>

            <Flex flexDirection='column'>
              <PaymentSelector />
              <Flex mt='1.5rem'>
                <Button borderRadius='none' mr='1rem' _hover={{ bg: 'none' }} name='payment' onClick={handleClick} border='2px' borderColor='accent' color='accent' bg='white'>Agregar método de pago</Button>
              </Flex>
              {/* eslint-disable-next-line */}
                </Flex>
            <Button mt='2rem' borderRadius='none' name='continuar' color='white' bg='accent' onClick={handleClick}>Continuar</Button>

          </Flex>
        </Flex>
        {/* column 2 */}
        <Flex w='25rem' p='2rem 2rem 0rem 2rem' boxShadow='md' flexDirection='column'>
          <Text fontWeight={500} mb='1.3rem' fontSize='larger'>Resumen de la compra</Text>
          <Divider mb='1rem' />
          <Text mb='1rem'>Productos ({cartProducts.reduce(
            (previousValue, p) => previousValue + p.quantity, 0)})
          </Text>
          <Text>Total: ${cartProducts.reduce((acc, p) => acc + (p.quantity * p.price), 0).toString().split('.')[0]}</Text>
        </Flex>
      </Flex>
    </Flex>

  // <>
  //   <PaymentSelector />
  //   <Button name='payment' m={3} _hover={{ color: 'gray' }} color='#2C2C2E' border='2px' borderColor='#2C2C2E' onClick={handleClick}>Agregar método de pago</Button>
  //   <Button name='buy' m={3} _hover={{ color: 'white' }} color='white' bg='#2C2C2E' onClick={handleClick}>Comprar</Button>
  // </>
  )
}
