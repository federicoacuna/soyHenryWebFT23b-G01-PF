import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../CartItem'
import { Flex, Box } from '@chakra-ui/react' //eslint-disable-line

export const CartItemContainer = () => {
  const user = useSelector(state => state.users.user)
  const localCart = useSelector(state => state.cart.localItems)
  const remoteCart = useSelector(state => state.cart.items)
  const cartProducts = user && user.id ? remoteCart : localCart

  return (
    <>
      {cartProducts.length
        ? <Flex mt='1rem' mr='7.3rem' ml='7.3rem' flexDirection='column' alignItems='center'>
          {cartProducts.map((product) => (
            <CartItem key={product.id + product.name} product={product} />))}
          {/* eslint-disable-next-line */}
          </Flex>
        : <Box minHeight='42.5vh'>No hay productos en el carrito</Box>}
    </>
  )
}

export default CartItemContainer
