import { useDispatch, useSelector } from 'react-redux'
import { WishListCard } from '../WishListCard'
import { Flex, Box } from '@chakra-ui/react' //eslint-disable-line
import { useEffect } from 'react'
import { getUserWishList } from '../../redux/actions/wishlist.actions'

export default function WishList () {
  const product = useSelector(state => state.wishlist.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserWishList)
  },[])//eslint-disable-line

  if (Array.isArray(product) === 0) return <Box minHeight='42.5vh'>No has agregado productos a la lista de deseos.</Box>
  return (
    <Flex minHeight='40vh' mt='1rem' mr='7.3rem' ml='7.3rem' flexDirection='column' alignItems='center'>
      {(product.length > 0) &&
        product.map((el, i) => (
          <WishListCard id={el.id} image={el.image} price={el.price} name={el.name} key={i} />))}
    </Flex>
  )
}
