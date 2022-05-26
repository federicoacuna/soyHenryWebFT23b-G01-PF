import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Button, Flex, useToast } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getUserAddresses } from '../../redux/actions/addresses.actions'
import { createMPCheckout } from '../../services/orders'
import AddressContainer from '../../components/AddressContainer'

const AddressSelector = () => {
  const userAddresses = useSelector(state => state.addresses.data)
  const orderStatus = useSelector(state => state.orders.order)
  const selectedAddress = useSelector(state => state.orders.order.address)
  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

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
    <><Link to='/cart'><IoMdArrowRoundBack size={30} _hover={{ bg: 'black' }} /></Link>
      <Flex justifyContent='center' alignItems='center' h='80vh' w='100vw'>
        <Flex flexDirection='column' borderRadius={5} boxShadow='lg' bg='secondary' w='70vw' p={5}>
          <Text p={0} fontSize='2xl' fontWeight='500' mb={2}>¿Donde quieres recibir tu compra? </Text>
          {Array.isArray(userAddresses) && <AddressContainer />}
          <Flex justifyContent='flex-end' mt={5} gap='1rem'>
            <Button name='AddAddress' onClick={handleClick} _hover={{ color: 'gray' }} color='#2C2C2E' border='2px' borderColor='#2C2C2E'>Agregar dirección</Button>
            <Button name='continuar' mr={3} _hover={{ color: 'gray' }} color='white' bg='#2C2C2E' onClick={handleClick}>Continuar</Button>
          </Flex>
        </Flex>
        {/*  eslint-disable-next-line */}
        </Flex>
    </>
  )
}

export default AddressSelector
