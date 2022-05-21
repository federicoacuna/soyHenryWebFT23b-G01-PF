import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, Button, Flex, Heading, useToast } from '@chakra-ui/react'
import { setUserAddress } from '../../redux/actions/index'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import AddressCard from '../../components/AddressCard'
import { getUserAddresses } from '../../redux/actions/addresses.actions'

const AddressSelector = () => {
  const userAddresses = useSelector(state => state.addresses)
  const selectedAddress = useSelector(state => state.order.userAddressId)
  const cartProducts = useSelector(state => state.cartProducts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const toast = useToast()

  useEffect(() => {
    dispatch(getUserAddresses())
  }, [])//eslint-disable-line

  const handleClick = (value) => {
    if (value.target.name === 'AddAddress') {
      navigate('/createaddress')
    }
    if (value.target.name === 'continuar' && selectedAddress) {
      navigate('/payment')
    } else {
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
      {user.id !== undefined && cartProducts.length !== 0
        ? <Flex justifyContent='center' alignItems='center' h='80vh' w='100vw'>
          <Flex flexDirection='column' borderRadius={5} boxShadow='lg' bg='secondary' w='70vw' p={5}>
            <Text p={0} fontSize='2xl' fontWeight='500' mb={2}>¿Donde quieres recibir tu compra? </Text>
            {userAddresses.length && userAddresses.map(address => <AddressCard
              key={address.id}
              id={address.id}
              postalCode={address.postalCode}
              streetName={address.streetName}
              houseNumber={address.houseNumber}
              city={address.city}
              state={address.state}
              country={address.country}
              onclick={() => dispatch(setUserAddress(address.id))}
                                                                  />)}
            <Flex justifyContent='flex-end' mt={5}>
              <Button name='AddAddress' onClick={handleClick} colorScheme='blue'>Agregar dirección</Button>
              {userAddresses.length !== 0 && <Button name='continuar' mr={3} colorScheme='blue' onClick={handleClick}>Continuar</Button>}
            </Flex>
          </Flex>
          {/*  eslint-disable-next-line */}
        </Flex>
        : <Flex justifyContent='center'><Heading>Error 404</Heading></Flex>}
    </>
  )
}

export default AddressSelector
