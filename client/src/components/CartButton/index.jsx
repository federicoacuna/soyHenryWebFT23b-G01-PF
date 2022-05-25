import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart } from '../../redux/actions'
import { useToast, Box, Flex } from '@chakra-ui/react'
import { BsCart } from 'react-icons/bs'

const CartButton = ({ product }) => {
  const dispatch = useDispatch()
  const cartProducts = useSelector(state => state.cartProducts)
  const exist = cartProducts.filter(p => parseInt(p.id) === parseInt(product.id))
  const toast = useToast()

  const handleClick = () => {
    dispatch(addProductToCart(product))
  }

  const toastAdd = () => {
    toast({
      title: 'Producto Agregado al Carrito.',
      status: 'success',
      duration: 2000,
      isClosable: true
    })
  }

  return (
    <Box>
      <Flex alignItems='center'>
        <Box width='10rem' height='2.5rem' display='flex' justifyContent='center' alignItems='center' cursor='pointer' p='0.5rem' bg='#0082E3' color='white' onClick={!isNaN(exist) ? handleClick : toastAdd}>Comprar ahora</Box>
        <Box ml='1rem'>
          <BsCart fontSize='1.7rem' />
        </Box>

      </Flex>

    </Box>
  )
}

export default CartButton
