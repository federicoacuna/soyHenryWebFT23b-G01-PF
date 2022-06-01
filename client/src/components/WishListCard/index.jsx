// import s from './index.module.css'
import WishListRemoveButton from '../WishListRemoveButton'
import { Flex, Box, Text, Image } from '@chakra-ui/react' //eslint-disable-line
import { Link } from 'react-router-dom'
import BuyNowButton from '../BuyNowButton'

export function WishListCard ({ image, id, price, name }) {
  return (
    <Flex bg='white' mt='1rem' mb='1rem' maxWidth='58rem' minHeight='10rem' flexDirection='column' boxShadow='md'>
      <Flex mr='1.6rem' ml='2.3rem' justifyContent='flex-start' mt='1.6rem'>
        <Flex borderRadius='5px' mr='2.3rem' alignItems='center' w='7.6rem' h='7.6rem'>
          <Link to={'/productDetail/' + id}>
            <Image w='7.2rem' h='7.2rem' objectFit='contain' src={image[0]} alt={name} />
          </Link>
        </Flex>
        <Text mr='6.5rem' w='21.8rem' textOverflow='ellipsis' overflow='hidden'>{name}</Text>
        <Text textAlign='center' w='6.2rem' fontSize='1.5rem' ml='18.7rem'>${price}</Text>
      </Flex>
      <Flex width='15rem' ml='2.3rem' mt='2rem' justifyContent='space-between' mb='1.6rem' color='accent'>
        <WishListRemoveButton productId={id} />
        <BuyNowButton product={{ id, price, name, image }} />
      </Flex>

    </Flex>

  // <Flex alignItems='center' bg='white' borderRadius={3} mt={2} mb={2} onClick={onclick}>
  //   <Flex w='100%' alignItems='center'>
  //     <Box w='100px' m={4}>
  //       <Link to={'/productDetail/' + id}>
  //         <Image boxSize='100%' src={image} />
  //       </Link>
  //     </Box>
  //     <Flex flexDirection='column' w='100%' m={4}>
  //       <Text>{name}</Text>
  //       <Text fontWeight={500} mt={2}>${price}</Text>
  //       <Flex mt={5} justifyContent='flex-end'>
  //         <WishListRemoveButton productId={id} />
  //       </Flex>
  //     </Flex>
  //     {/* <VStack pt={3} pb={3} alignItems='flex-start'>
  //       <Text>{name}</Text>
  //       <Text>{price}</Text>
  //     </VStack> */}
  //   </Flex>

  // </Flex>

  )
  // <div className={s.chinchulin}>
  //   <p>{name}</p>
  //   <img src={image} alt='product' />
  //   <p>{price}</p>
  //   <p className={s.remove}><WishListRemoveButton productId={id} /></p>

  // </div>
}
