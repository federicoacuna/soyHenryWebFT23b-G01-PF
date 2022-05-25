import CartButton from '../CartButton'
import s from './index.module.css'
import { Link } from 'react-router-dom'
import WishListManagerButton from '../WishListManagerButton'
import { Box, Text } from '@chakra-ui/react'
import { FcLikePlaceholder } from 'react-icons/fc'
import { AiFillStar } from 'react-icons/ai'
export default function ProductCard ({ product, shouldDisplay }) {
  const { id, price, image } = product

  return (
    <Box p='1rem' m='1rem' minHeight='320px' width='220px' boxShadow='md' display='flex' flexDirection='column' justifyContent='space-between' alignItems='center'>
      <Box alignSelf='flex-end'><FcLikePlaceholder fontSize='1.7rem' /></Box>
      <Link className={s.link} to={'/productDetail/' + id}>
        <img src={image[0]} alt='Product' />
      </Link>
      <Text alignSelf='flex-start' display='flex'><AiFillStar color='orange' /><AiFillStar color='orange' /><AiFillStar color='orange' /></Text>
      <Text mt='0.3rem' mb='0.3rem' alignSelf='flex-start'>Periferico requerepiola</Text>
      <Text mt='0.3rem' mb='0.3rem' alignSelf='flex-start'>{price}</Text>
      <Box mt='0.3rem' mb='0.3rem' alignSelf='flex-start'>
        <CartButton product={product} />
      </Box>

      {shouldDisplay && <WishListManagerButton productId={id} />}
    </Box>
  )
}
