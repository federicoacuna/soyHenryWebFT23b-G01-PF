import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Heading, Text, Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { setOrderItems } from '../../redux/actions/orders.actions'
import CartItemContainer from '../../components/CartItemContainer'
import ModalLogin from '../../components/ModalLogin'
import WishList from '../../components/WishList'
import { removeBuyNowItem } from '../../redux/actions/buyNow.actions'

export const Cart = () => {
  useEffect(() => {
    dispatch(removeBuyNowItem())
  })
  const cartProducts = useSelector(state => {
    if (state.users.token === '') return state.cart.localItems
    return state.cart.items
  })
  const [modal, setModal] = useState(false)
  const token = useSelector(state => state.users.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const totalProductCount = cartProducts.reduce((acc, p) => acc + (p.quantity * p.price.split('.').join('')), 0)

  const handleSubmit = () => {
    dispatch(setOrderItems(cartProducts))
    token ? navigate('/addresses') : setModal(true)
  }

  return (
    <Flex flexDirection='column' justifyContent='center'>
      <Flex mt='1rem' flexDirection='column' justifyContent='center' alignItems='center'>
        <Tabs w='61.3rem'>
          <TabList color='accent' _active={{ color: 'accent' }}>
            <Tab _focus={{ outline: 'none' }}>Carrito</Tab>
            {token && <Tab _focus={{ outline: 'none' }}>Lista de deseos</Tab>}
          </TabList>
          <TabPanels>
            <TabPanel>
              <CartItemContainer />
              <Flex w='61.3rem' flexDirection='column' justifyContent='center' alignItems='flex-end'>
                {totalProductCount > 0 &&
                  <>
                    <Text mt='3.4rem' mb='3.4rem' fontSize='1.5rem'>Total: ${totalProductCount} </Text>
                    <Button mb='2rem' onClick={handleSubmit} bg='accent' color='secondary' borderRadius='none' _hover={{ bg: 'accent' }}>Continuar compra</Button>
                  </>}
              </Flex>
            </TabPanel>
            {token &&
              <TabPanel>
                <WishList />
              </TabPanel>}
          </TabPanels>
        </Tabs>
      </Flex>
      <ModalLogin state={modal} setState={setModal}>
        <Heading color='black' textAlign='center'>No has iniciado sesión</Heading>
        <Text color='black' mt={2} textAlign='center'>Para seguir con tu compra debes registrarte o iniciar sesión.</Text>
      </ModalLogin>
    </Flex>

  )
}

export default Cart
