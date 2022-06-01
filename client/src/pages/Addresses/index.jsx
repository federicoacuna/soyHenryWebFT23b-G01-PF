import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Button, Flex, useToast, RadioGroup, Radio, Stack, Box, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react' //eslint-disable-line
import { useNavigate, Link } from 'react-router-dom'
import { getUserAddresses } from '../../redux/actions/addresses.actions'
import { createMPCheckout } from '../../services/orders'
import AddressContainer from '../../components/AddressContainer'

// import BranchContainer from '../../components/BranchContainer'

const AddressSelector = () => {
  // const userAddresses = useSelector(state => state.addresses.data)
  const orderStatus = useSelector(state => state.orders.order)
  const selectedAddress = useSelector(state => state.orders.order.address)
  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  // const [radioValue, setRadioValue] = React.useState('1')
  const buyNowItem = useSelector(state => state.buyNow.item)
  const cartProducts = useSelector(state => state.cart.items)
  let checkOutItems
  if (Array.isArray(buyNowItem) && buyNowItem.length === 1) { checkOutItems = buyNowItem } else { checkOutItems = cartProducts }

  useEffect(() => {
    orderStatus.orderItems || navigate('/')
    orderStatus.orderItems && dispatch(getUserAddresses())
  }, [])//eslint-disable-line

  const handleClick = async (value) => {
    if (value.target.name === 'AddAddress') {
      navigate('/createaddress')
    }
    if (value.target.name === 'continuar' && selectedAddress) {
      const newOrder = {
        ...orderStatus,
        user
      }
      newOrder.total = newOrder.orderItems.reduce((total, item) => total + (parseInt(item.price.replace('.', '')) * item.quantity), 0)
      const preferences = await createMPCheckout(newOrder)
      window.location.replace(preferences.init_point)
    }
    if (value.target.name === 'continuar' && !selectedAddress) {
      toast({
        title: 'No podemos continuar',
        description: 'Debe seleccionar una direccion para su envio.',
        status: 'error',
        duration: 3500,
        isClosable: true
      })
    }
  }

  return (

    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Breadcrumb mt='1rem' p='0rem 0rem 0rem 2rem' w='61.3rem' spacing='8px' separator='<'>
        <BreadcrumbItem>
          <BreadcrumbLink textDecoration='underline'><Link to='/cart'>Carrito</Link></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink textDecoration='underline'><Link to='#'>Checkout</Link></BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex mb='2rem' ml='5.3rem' mr='5.3rem' w='61.3rem' justifyContent='space-between'>

        {/* column 1 */}
        <Flex p='2rem 2rem 0rem 2rem' flexDirection='column' w='30rem'>
          {/* <Text mb='2.3rem' fontWeight={500} fontSize='larger'>¿Cómo quieres recibir tu compra?</Text>
          <RadioGroup onChange={setRadioValue} value={radioValue}>
            <Stack direction='column'>
              <Radio value='1'>Recibir la compra</Radio>
              <Radio value='2'>Retirar la compra</Radio>
            </Stack>
          </RadioGroup> */}
          <Flex flexDirection='column'>

            <Flex flexDirection='column'>
              <Text fontSize='larger' mt='2.3rem' mb='1rem' fontWeight={500}>
                Selecciona una dirección de envío:
              </Text>
              <AddressContainer />
              <Flex mt='1.5rem'>
                <Button borderRadius='none' mr='1rem' _hover={{ bg: 'none' }} name='AddAddress' onClick={handleClick} border='2px' borderColor='accent' color='accent' bg='white'>Agregar dirección</Button>
              </Flex>
              {/* eslint-disable-next-line */}
                </Flex>

            {/* <Flex flexDirection='column'>
              <Text mt='2.3rem' mb='1rem' fontWeight={500} fontSize='larger'>Selecciona una sucursal:</Text>
              <BranchContainer />
            </Flex> */}
            <Button mt='2rem' borderRadius='none' _hover={{ bg: 'accent' }} name='continuar' color='white' bg='accent' onClick={handleClick}>Continuar</Button>

          </Flex>
        </Flex>
        {/* column 2 */}
        <Flex borderLeft='2px' borderColor='secondary' w='25rem' p='2rem 2rem 0rem 2rem' boxShadow='md' flexDirection='column'>
          <Text fontWeight={500} mb='1.3rem' fontSize='larger'>Resumen de la compra</Text>
          <Divider mb='1rem' />
          <Text mb='1rem'>Productos ({checkOutItems.reduce(
            (previousValue, p) => previousValue + p.quantity, 0)})
          </Text>
          <Text>Total: ${checkOutItems.reduce((acc, p) => acc + (p.quantity * p.price.split('.').join('')), 0)}</Text>
        </Flex>
      </Flex>
    </Flex>

  // <><Link to='/cart'><IoMdArrowRoundBack size={30} _hover={{ bg: 'black' }} /></Link>
  //   <Flex justifyContent='center' alignItems='center' h='80vh' w='100vw'>
  //     <Flex flexDirection='column' borderRadius={5} boxShadow='lg' bg='secondary' w='70vw' p={5}>
  //       <Text p={0} fontSize='2xl' fontWeight='500' mb={2}>¿Donde quieres recibir tu compra? </Text>
  //       {Array.isArray(userAddresses) && <AddressContainer />}
  //       <Flex justifyContent='flex-end' mt={5} gap='1rem'>
  //         <Button name='AddAddress' onClick={handleClick} _hover={{ color: 'gray' }} color='#2C2C2E' border='2px' borderColor='#2C2C2E'>Agregar dirección</Button>
  //         <Button name='continuar' mr={3} _hover={{ color: 'gray' }} color='white' bg='#2C2C2E' onClick={handleClick}>Continuar</Button>
  //       </Flex>
  //     </Flex>
  //     {/*  eslint-disable-next-line */}
  //     </Flex>
  // </>
  )
}

export default AddressSelector
