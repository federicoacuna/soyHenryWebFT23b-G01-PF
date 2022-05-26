import CartButton from '../CartButton'
import s from './index.module.css'
import { Heading, Center, Container, Flex, Text, Button } from '@chakra-ui/react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProductDetails } from '../../redux/actions/products.actions'
import ReviewCard from '../ReviewCard'
import BuyNowButton from '../BuyNowButton'

function ProductDetail () {
  const product = useSelector(state => state.products.productDetail)
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  function handleClick () {
    navigate(`/createreview/${product.id}`)
  }

  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [])//eslint-disable-line

  return (
    <Flex alignItems='flex-start'>
      <Link to='/'><Flex position='relative' mt='40px' ml='40px'><IoMdArrowRoundBack size={30} /></Flex></Link>
      <Center w='100%' p={4}>
        <Flex flexDirection='column' alignItems='center' gap='1rem'>
          <Flex alignItems='center' justifyContent='center' boxShadow='lg' borderRadius='10' bg='#E5E5EA' p={4} color='#black'>
            <Container maxW='md'>
              <img className={s.product__img} src={product.image} alt={product.name} />
            </Container>
            <Container maxW='md'>
              <Heading textShadow='2px 2px 5px rgba(0,0,0,0.25)'>{product.name}</Heading>
              <Text pt={3}>
                {product.category && product.category.name}
              </Text>
              <Text fontSize='xl' fontWeight='bold' mt={3}>${product.price}</Text>
              <Text fontWeight='bold' pt={3}>Especificaciones:</Text>
              <Text>{product.description}</Text>
              <Text fontWeight='bold' pt={3}>Marca:</Text>
              <Text>{product.brand && product.brand.name}</Text>
              <Text fontWeight='bold' pt={3}>Modelo:</Text>
              <Text>{product.model}</Text>

              <Flex mt='10px' justifyContent='flex-start'>
                <BuyNowButton />
                <CartButton product={product} />
                {product.canReview === true ? <Button mr='10px' color='white' bg='#2C2C2E' _hover={{ bg: 'black' }} onClick={handleClick}> Agregar Reseña </Button> : null}
              </Flex>
            </Container>
          </Flex>
          <Flex gap='1rem' flexDirection='column' width='100%'>
            {Array.isArray(product.reviews) && product.reviews.map((r, i) => (
              <ReviewCard
                key={r.productId + i}
                rating={r.rating}
                review={r.review}
                productId={r.productId}
                productName={r.name}
                productImage={r.image}
              />
            ))}
          </Flex>
        </Flex>
      </Center>
    </Flex>
  )
}

export default ProductDetail