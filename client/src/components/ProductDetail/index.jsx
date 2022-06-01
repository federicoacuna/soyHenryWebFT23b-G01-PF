import { useEffect } from 'react'
import s from './index.module.css'
import { Center, Container, Flex, Text, Box } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../../redux/actions/products.actions'
import ReviewCard from '../ReviewCard'
import WishListManagerButton from '../WishListManagerButton'
import CartButton from '../CartButton'
import BuyNowButton from '../BuyNowButton'

function ProductDetail () {
  const product = useSelector(state => state.products.productDetail)
  const token = useSelector(state => state.users.token)
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
    <Flex flexDirection='column'>
      <Flex pl='7rem' pr='7rem' pt='3rem' pb='3rem' justifyContent='center' alignItems='center' borderColor='red'>
        <Center display='flex' justifyContent='center' alignItems='center' borderColor='blue'>
          <Flex w='80rem' alignItems='flex-start' justifyContent='center' bg='#white' color='#black'>
            <Container ml='11rem' mt='3rem' width='100%'>
              <Flex gap='1rem'>
                <Flex flexDirection='column' gap='0.5rem' boxShadow='md'>
                  <img className={s.productImgLittle} src={product.image} alt={product.name} />
                  <img className={s.productImgLittle} src={product.image} alt={product.name} />
                  <img className={s.productImgLittle} src={product.image} alt={product.name} />
                </Flex>
                <Box boxShadow='md'>
                  <img className={s.productImg} src={product.image} alt={product.name} />
                </Box>

              </Flex>

            </Container>
            <Container minHeight='10rem' boxShadow='md' mr='10rem' width='15rem' p='1rem' gap='0.2rem' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <Box alignSelf='flex-end' mb='1rem'>{token && <WishListManagerButton productId={product.id} />}</Box>
              <Text fontWeight='bold'>{product.name}</Text>
              <Text alignSelf='flex-start' fontWeight='bold'>
                {product.category && product.category.name}
              </Text>
              <Text alignSelf='flex-start' mt={3}>${product.price}</Text>
              <Text fontWeight='bold' pt={3} alignSelf='flex-start'>Marca</Text>
              <Text alignSelf='flex-start'>{product.brand && product.brand.name}</Text>
              <Text alignSelf='flex-start' fontWeight='bold' pt={3}>Modelo</Text>
              <Text alignSelf='flex-start'>{product.model}</Text>
              {product.canReview === true ? <Box onClick={handleClick} ml='0.1rem' alignSelf='flex-start' width='10rem' height='2.5rem' display='flex' justifyContent='center' alignItems='center' cursor='pointer' p='0.5rem' bg='#0082E3' color='white'>Agregar reseña</Box> : null}

              <Flex mt='10px' justifyContent='flex-start'>
                <BuyNowButton product={product} />
                <CartButton product={product} />
              </Flex>
            </Container>
          </Flex>
        </Center>
      </Flex>
      <Flex pl='7rem' pr='7rem' pt='3rem' pb='3rem' borderColor='aqua' justifyContent='space-between'>
        <Flex p='1rem' borderColor='green' ml='6rem' min-height='5rem' width='50%' flexDirection='column'>
          <Text fontWeight='bold'>Descripcion del producto</Text>
          <Text>{product.description}</Text>
        </Flex>
      </Flex>

      <Flex pl='7rem' pr='7rem' pt='3rem' pb='3rem' borderColor='orange' flexDirection='column' width='100%'>
        <Flex min-height='5rem' width='50%' gap='1rem' ml='6rem' flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
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
    </Flex>

  )
}

export default ProductDetail
