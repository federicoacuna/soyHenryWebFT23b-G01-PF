import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../CartItem'
// import s from './index.module.css'
import { Flex, Box } from '@chakra-ui/react' //eslint-disable-line

export const CartItems = () => {
  const cartProducts = useSelector(state => state.cartProducts)

  if (cartProducts.length === 0) return <Box h='20vh'>No hay productos en el carrito</Box>

  return (
    <Flex mt='1rem' mr='7.3rem' ml='7.3rem' flexDirection='column' alignItems='center'>
      {cartProducts.map((p) => (
        <CartItem key={p.id + p.name} product={p} />))}
    </Flex>
  )
}

export default CartItems
