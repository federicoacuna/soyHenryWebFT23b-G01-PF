import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Textarea,
  ButtonGroup,
  Button,
  useToast,
  SliderMark
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { createReview } from '../../redux/actions/reviews.action'
import { useDispatch } from 'react-redux'
import { AiFillStar } from 'react-icons/ai'

export default function Reviews () {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    rating: 5,
    review: '',
    productId
  })
  function handleInputChange (e) {
    e.preventDefault()
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  function handleBackClick () {
    setValues({
      rating: 5,
      review: '',
      productId
    })
    navigate(-1)
  }
  function handleClick () {
    if (values.rating && values.review !== '') {
      dispatch(createReview(values))
      navigate(-1)
    } else {
      toast({
        description: 'Necesita completar los campos.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }
  return (
    <div>
      {/* <h1>{productName}</h1> */}
      <Box display='flex' justifyContent='center' alignItems='center' p='7rem'>
        <Box display='flex' flexDirection='column' gap='1rem'>
          <Slider color='black' width='150px' mb='1rem' defaultValue={values.rating} min={1} max={5} step={1} onChangeEnd={(rating) => setValues({ ...values, rating })}>
            <SliderMark value={1} mt='1' fontSize='sm'><AiFillStar size={20} color='orange' /></SliderMark>
            <SliderMark value={2} mt='1' fontSize='sm'><AiFillStar size={20} color='orange' /></SliderMark>
            <SliderMark value={3} mt='1' fontSize='sm'><AiFillStar size={20} color='orange' /></SliderMark>
            <SliderMark value={4} mt='1' fontSize='sm'><AiFillStar size={20} color='orange' /></SliderMark>
            <SliderMark value={5} mt='1' fontSize='sm'><AiFillStar size={20} color='orange' /></SliderMark>
            <SliderTrack>
              <Box />
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Textarea width='400px' placeholder='Deja tu comentario' onChange={handleInputChange} name='review' />
          {/* botones */}
          <ButtonGroup variant='outline' spacing='6'>
            <Button colorScheme='blue' onClick={handleClick}>Guardar</Button>
            <Button onClick={handleBackClick}>Cancelar</Button>
          </ButtonGroup>
        </Box>
      </Box>

    </div>
  )
}
