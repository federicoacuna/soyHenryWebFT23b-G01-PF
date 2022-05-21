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
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createNewReview } from '../../services/Reviews'

export default function Reviews (productName, productId, navigateURL) {
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
    navigate(navigateURL)
  }
  function handleClick () {
    if (!values.rating === '' && !values.review === '') {
      createNewReview(values)
      toast({
        description: 'Review creada con éxito.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
    } else {
      toast({
        description: 'Necesita completar los campos.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
    // navigate(navigateURL)
  }
  return (
    <div>
      {/* <h1>{productName}</h1> */}
      <Slider defaultValue={5} min={1} max={5} step={1} onChangeEnd={(rating) => setValues({ ...values, rating })}>
        <SliderMark value={1} mt='1' ml='-2.5' fontSize='sm'>1</SliderMark>
        <SliderMark value={2} mt='1' ml='-2.5' fontSize='sm'>2</SliderMark>
        <SliderMark value={3} mt='1' ml='-2.5' fontSize='sm'>3</SliderMark>
        <SliderMark value={4} mt='1' ml='-2.5' fontSize='sm'>4</SliderMark>
        <SliderMark value={5} mt='1' ml='-2.5' fontSize='sm'>5</SliderMark>
        <SliderTrack>
          <Box />
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Textarea placeholder='Deja tu comentario' onChange={handleInputChange} name='review' />
      {/* botones */}
      <ButtonGroup variant='outline' spacing='6'>
        <Button colorScheme='blue' onClick={handleClick}>Guardar</Button>
        <Button onClick={handleBackClick}>Cancelar</Button>
      </ButtonGroup>
    </div>
  )
}
