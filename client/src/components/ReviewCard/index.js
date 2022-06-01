import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { Flex, Text, Box } from '@chakra-ui/react'

export default function ReviewCard ({ rating, review, productId, productName, productImage }) {
  return (
    <Box boxShadow='md' width='100%' minHeight='75px'>
      <Text fontSize='1.2rem' fontWeight='600'>{productName}</Text>
      <Flex justifyContent='space-between'>
        <Text maxWidth='90%'>{review}</Text>
        <Text display='flex' justifyContent='center' alignItems='center'> <AiFillStar size={20} color='orange' />{rating}</Text>

      </Flex>
    </Box>

  )
}
