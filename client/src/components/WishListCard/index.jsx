// import s from './index.module.css'
import WishListRemoveButton from '../WishListRemoveButton'
import { Flex, Text, Image, Box } from '@chakra-ui/react'

export function WishListCard ({ image, id, price, name }) {
  return (
    <Flex alignItems='center' bg='white' borderRadius={3} mt={2} mb={2} onClick={onclick}>
      <Flex w='100%' alignItems='center'>
        <Box w='100px' m={4}>
          <Image boxSize='100%' src={image} />
        </Box>
        <Flex flexDirection='column' w='100%' m={4}>
          <Text>{name}</Text>
          <Text fontWeight={500} mt={2}>${price}</Text>
          <Flex mt={5} justifyContent='flex-end'>
            <WishListRemoveButton productId={id} />
          </Flex>
        </Flex>
        {/* <VStack pt={3} pb={3} alignItems='flex-start'>
          <Text>{name}</Text>
          <Text>{price}</Text>
        </VStack> */}
      </Flex>
    </Flex>
    // <div className={s.chinchulin}>
    //   <p>{name}</p>
    //   <img src={image} alt='product' />
    //   <p>{price}</p>
    //   <p className={s.remove}><WishListRemoveButton productId={id} /></p>

  // </div>

  )
}
