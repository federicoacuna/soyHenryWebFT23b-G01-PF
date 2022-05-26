import CartButton from '../CartButton'
import s from './index.module.css'
import { Center, Container, Flex, Text, Button, Box } from '@chakra-ui/react'

import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProductDetails } from '../../redux/actions/products.actions'
import ReviewCard from '../ReviewCard'
import BuyNowButton from '../BuyNowButton'
import { FcLikePlaceholder } from 'react-icons/fc'
import { AiFillStar } from 'react-icons/ai'

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
    <Flex flexDirection='column'>
      <Flex pl='7rem' pr='7rem' pt='3rem' pb='3rem' justifyContent='center' alignItems='center' borderColor='red'>
        <Center display='flex' justifyContent='center' alignItems='center' borderColor='blue'>
          <Flex w='80rem' alignItems='flex-start' justifyContent='center' bg='#white' color='#black'>
            <Container ml='15rem' mt='3rem' width='100%'>
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
            <Container minHeight='10rem' boxShadow='md' mr='15rem' width='15rem' p='1rem' gap='0.2rem' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <Box alignSelf='flex-end'><FcLikePlaceholder fontSize='1.7rem' /></Box>
              <Text fontWeight='bold'>{product.name}</Text>
              <Text alignSelf='flex-start' fontWeight='bold'>
                {product.category && product.category.name}
              </Text>
              <Text alignSelf='flex-start' mt={3}>${product.price}</Text>
              <Text fontWeight='bold' pt={3} alignSelf='flex-start'>Marca</Text>
              <Text alignSelf='flex-start'>{product.brand && product.brand.name}</Text>
              <Text alignSelf='flex-start' fontWeight='bold' pt={3}>Modelo</Text>
              <Text alignSelf='flex-start'>{product.model}</Text>

              <Flex mt='10px' justifyContent='flex-start'>
                <BuyNowButton />
                <CartButton product={product} />
                {product.canReview === true ? <Button mr='10px' color='white' bg='#2C2C2E' _hover={{ bg: 'black' }} onClick={handleClick}> Agregar Reseña </Button> : null}
              </Flex>
            </Container>
          </Flex>
        </Center>
      </Flex>
      <Flex pl='7rem' pr='7rem' pt='3rem' pb='3rem' borderColor='aqua' justifyContent='space-between'>
        <Flex p='1rem' borderColor='green' ml='6rem' width='50%' flexDirection='column'>
          <Text fontWeight='bold'>Descripcion del producto</Text>
          <Text>{product.description}</Text>
        </Flex>
        <Flex p='1rem' borderColor='green' width='25%' gap='1rem' flexDirection='column'>
          <Text fontWeight='bold'>Promedio reviews</Text>
          <Flex gap='1rem' justifyContent='flex-start' alignItems='center'>
            <Text fontSize='1.2rem'>3.3</Text>
            <Text display='flex' gap='0.2rem'><AiFillStar color='orange' fontSize='1.3rem' /><AiFillStar color='orange' fontSize='1.3rem' /><AiFillStar color='orange' fontSize='1.3rem' /></Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex pl='7rem' pr='7rem' pt='3rem' pb='3rem' borderColor='orange' flexDirection='column' width='100%'>
        <Flex boxShadow='md' min-height='5rem' p='1rem' gap='1rem' ml='5rem' flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
          <Text display='flex' gap='0.2rem'><AiFillStar color='orange' fontSize='1.3rem' /><AiFillStar color='orange' fontSize='1.3rem' /><AiFillStar color='orange' fontSize='1.3rem' /></Text>
          <Text>Ea iusto unde qui tempora velit vel enim error aut impedit repellendus rem atque architecto aut dolor autem? Hic galisum natus sed quas quia qui nihil laborum.</Text>
        </Flex>
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

  )
}

export default ProductDetail
