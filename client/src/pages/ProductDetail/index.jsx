import CartButton from '../../components/CartButton'
import s from '../ProductDetail/index.module.css'
import { Heading, Center, Container, Flex, Text, Badge, Box, Button } from '@chakra-ui/react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

function ProductDetail () {
  const product = {
    id: 1,
    name: 'voluptatem necessitatibus optio nemo',
    description: 'Enim tempora et. Odio provident alias sed assumenda. Cumque illo repudiandae dolorum.',
    brand: 'Inc',
    model: '3vavcbu',
    price: '981.00',
    image: [
      'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SX679_.jpg'
    ],
    categories: [{ name: 'Laptops' }]
  }

  return (
    <Flex alignItems='flex-start'>
      <Link to='/'><Flex position='relative' mt='40px' ml='40px'><IoMdArrowRoundBack size={30} /></Flex></Link>
      <Center w='100%' h='90vh' p={4}>
        <Flex alignItems='center' justifyContent='center' boxShadow='lg' borderRadius='10' bg='#E5E5EA' p={4} color='#black'>
          <Container maxW='md'>
            <img className={s.product__img} src={product.image[0]} alt={product.name} />
          </Container>
          <Container maxW='md'>
            <Heading textShadow='2px 2px 5px rgba(0,0,0,0.25)'>{product.name}</Heading>
            <Box pt={3}>
              {product.categories.map(({ id, name }) => (
                <Badge key={id + name} variant='solid' bg='#2C2C2E'>{name}</Badge>
              ))}
            </Box>
            <Text fontSize='xl' fontWeight='bold' mt={3}>${product.price}</Text>
            <Text fontWeight='bold' pt={3}>Especificaciones:</Text>
            <Text>{product.description}</Text>
            <Text fontWeight='bold' pt={3}>Marca:</Text>
            <Text>{product.brand}</Text>
            <Text fontWeight='bold' pt={3}>Modelo:</Text>
            <Text>{product.model}</Text>

            <Flex mt='10px' justifyContent='flex-start'>
              <Button mr='10px' color='white' bg='#2C2C2E' _hover={{ bg: 'black' }}>Comprar Ahora</Button>
              <CartButton product={product} />
            </Flex>
          </Container>
        </Flex>
      </Center>
    </Flex>
  )
}

export default ProductDetail
