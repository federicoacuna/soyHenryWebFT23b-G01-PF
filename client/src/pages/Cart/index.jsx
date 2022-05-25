import { useDispatch, useSelector } from 'react-redux'
import CartItems from '../../components/CartItems'
// import CartDeleteAllProducts from '../../components/CartDeleteAllProducts'
import { useNavigate } from 'react-router-dom'
// import s from './index.module.css'
// import { IoMdArrowRoundBack } from 'react-icons/io'
import { useState } from 'react'
import ModalLogin from '../../components/ModalLogin'
// import { Heading, Text, Flex, Button } from '@chakra-ui/react'
import { setOrderItems } from '../../redux/actions'
import { Heading, Text, Flex, Button, Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react' //eslint-disable-line
import WishList from '../../components/WishList'

export const Cart = () => {
  const cartProducts = useSelector(state => state.cartProducts)
  const [modal, setModal] = useState(false)
  const user = useSelector(state => state.user.id)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(setOrderItems())
    user ? navigate('/addresses') : setModal(true)
  }

  return (
    <Flex flexDirection='column' justifyContent='center'>
      {/* <Link to='/' className={s.arrow}><IoMdArrowRoundBack size={30} _hover={{ bg: 'black' }} /></Link> */}

      <Flex mt='1rem' flexDirection='column' justifyContent='center' alignItems='center'>
        {/* <div className={s.btnDelete}>
          {cartProducts.length ? <CartDeleteAllProducts /> : <p />}
        </div> */}
        <Tabs w='61.3rem'>
          <TabList color='accent' _active={{ color: 'accent' }}>
            <Tab>Carrito</Tab>
            <Tab>Lista de deseos</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <CartItems />
              <Flex w='61.3rem' flexDirection='column' justifyContent='center' alignItems='flex-end'>
                <Text mt='3.4rem' mb='3.4rem' fontSize='1.5rem'>Total: ${cartProducts.reduce((acc, p) => acc + (p.quantity * p.price), 0).toString().split('.')[0]} </Text>
                {cartProducts.length > 0 ? <Button mb='2rem' onClick={handleSubmit} bg='accent' color='secondary'>Continuar compra</Button> : <p />}
              </Flex>
            </TabPanel>
            <TabPanel>
              <WishList />
            </TabPanel>
          </TabPanels>

        </Tabs>
      </Flex>

      {/* <Fade in={isOpen}> */}
      <ModalLogin state={modal} setState={setModal}>
        <Heading color='black' textAlign='center'>No has iniciado sesión</Heading>
        <Text color='black' mt={2} textAlign='center'>Para seguir con tu compra debes registrarte o iniciar sesión.</Text>
      </ModalLogin>
      {/* </Fade> */}
    </Flex>

  )
}

export default Cart
