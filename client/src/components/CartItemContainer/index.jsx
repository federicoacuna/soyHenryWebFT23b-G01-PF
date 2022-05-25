import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../CartItem'
import { Flex, Box } from '@chakra-ui/react' //eslint-disable-line

export const CartItemContainer = () => {
  const cartProducts = useSelector(state => state.cart.items)

  return (
    <>
      {cartProducts.length
        ? <Flex mt='1rem' mr='7.3rem' ml='7.3rem' flexDirection='column' alignItems='center'>
          {cartProducts.map((p) => (
            <CartItem key={p.id + p.name} product={p} />))}
          {/* eslint-disable-next-line */}
          </Flex>
        : <Box h='20vh'>No hay productos en el carrito</Box>}
    </>
  )
}

export default CartItemContainer
