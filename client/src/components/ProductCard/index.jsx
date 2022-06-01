import CartButton from '../CartButton'
import s from './index.module.css'
import { Link } from 'react-router-dom'
import WishListManagerButton from '../WishListManagerButton'
import { Box, Text, Flex } from '@chakra-ui/react'

import BuyNowButton from '../BuyNowButton'
export default function ProductCard ({ product, shouldDisplay, setState, state }) {
  const { id, price, image, name } = product

  return (
    <Box _hover={{ boxShadow: 'xl', transform: 'scale(1.010)', transition: 'ease 0.25s' }} transition='ease 0.25s' p='1rem' m='1rem' minHeight='320px' width='220px' boxShadow='md' display='flex' flexDirection='column' justifyContent='space-between' alignItems='center'>
      <Box alignSelf='flex-end'>{shouldDisplay && <WishListManagerButton productId={id} />}</Box>
      <Link className={s.link} to={'/productDetail/' + id}>
        <img src={image[0]} alt='Product' />
      </Link>

      <Text mt='0.3rem' mb='0.3rem' alignSelf='flex-start'>{name}</Text>
      <Text fontWeight={500} mt='0.3rem' mb='0.3rem' alignSelf='flex-start'>${price}</Text>
      <Flex mt='0.3rem' mb='0.3rem' alignSelf='flex-start'>
        <BuyNowButton state={state} setState={setState} product={product} />
        <CartButton product={product} />
      </Flex>

    </Box>
  )
}
