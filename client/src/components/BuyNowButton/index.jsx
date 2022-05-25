import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

const BuyNowButton = ({ product }) => {
  return (
    <Flex alignItems='center'>
      <Box width='10rem' height='2.5rem' display='flex' justifyContent='center' alignItems='center' cursor='pointer' p='0.5rem' bg='#0082E3' color='white'>Comprar ahora</Box>
    </Flex>
  )
}

export default BuyNowButton
