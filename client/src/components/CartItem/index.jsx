import CartItemRemove from '../CartItemRemove'
import CartItemQuantity from '../CartItemQuantity'
import { Flex, Box, Text, Image } from '@chakra-ui/react' //eslint-disable-line
import { Link } from 'react-router-dom'
// import s from './index.module.css'

export default function CartItem ({ product }) {
  const { name, image, price, quantity } = product
  return (
    <Flex mt='1rem' mb='1rem' w='61.3rem' flexDirection='column' boxShadow='md'>
      <Flex mr='1.6rem' ml='1.6rem' justifyContent='center' mt='1.6rem'>
        <Flex border='2px' borderColor='secondary' borderRadius='5px' mr='2.3rem' alignItems='center' w='7.6rem' h='7.6rem'>
          <Image w='7.2rem' h='7.2rem' objectFit='contain' src={image[0]} alt={name} />
        </Flex>
        <Text mr='6.5rem' w='21.8rem' textOverflow='ellipsis' overflow='hidden'>{name}</Text>
        <CartItemQuantity product={product} />
        <Text textAlign='center' w='6.2rem' fontSize='1.5rem'>${quantity * price.split('.')[0]}</Text>
      </Flex>
      <Flex width='30rem' ml='2.3rem' mt='2rem' justifyContent='space-between' mb='1.6rem' color='accent'>
        <CartItemRemove product={product} />
        <Link to=''><Text>Guardar en lista de deseos</Text></Link>
        <Link to=''><Text>Comprar ahora</Text></Link>
      </Flex>

    </Flex>
  )
}
