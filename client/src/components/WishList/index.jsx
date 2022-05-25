import { useSelector } from 'react-redux'
// import s from './index.module.css'
import { WishListCard } from '../WishListCard'
import { Flex, Box } from '@chakra-ui/react' //eslint-disable-line

export default function WishList () {
  const product = useSelector(state => state.wishlist)

  if (product.length === 0) return <Box h='43vh'>No has agregado productos a la lista de deseos.</Box>
  return (
    <Flex mt='1rem' mr='7.3rem' ml='7.3rem' flexDirection='column' alignItems='center'>
      {(product.length > 0) &&
        product.map((el, i) => (
          <WishListCard id={el.id} image={el.image} price={el.price} name={el.name} key={i} />))}
    </Flex>
    // <div className={s.container}>
    //   {(product.length > 0)
    //     ? product.map((el, i) =>
    //       <WishListCard id={el.id} image={el.image} price={el.price} name={el.name} key={i} />)
    //     : 'No has agregado productos a la lista de deseos.'}
    // </div>

  )
}
