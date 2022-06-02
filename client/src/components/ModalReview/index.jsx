import React, { useState } from 'react'
import s from '../ModalLogin/index.module.css'
import {  Button, useToast, Flex, Box, Slider, SliderMark, SliderTrack, SliderFilledTrack, SliderThumb, Textarea, ButtonGroup } from '@chakra-ui/react'// eslint-disable-line
import { AiOutlineClose, AiFillStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { createReview } from '../../redux/actions/reviews.action'
import { useDispatch } from 'react-redux'

export const ModalReview = ({ state, setState, id }) => {
  const handleClickCerrar = () => {
    setState(false)
  }

  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    rating: 5,
    review: '',
    productId: id
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
      productId: id
    })
    navigate(-1)
  }
  function handleClick () {
    if (values.rating && values.review !== '') {
      dispatch(createReview(values))
      navigate('/')
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
    <>
      {state &&
        <div className={s.overlay}>
          <div className={s.container}>
            <Flex borderRadius='none' flexDirection='column'>
              <Flex cursor='pointer' justifyContent='flex-end'>
                <AiOutlineClose color='black' onClick={handleClickCerrar} size={30} />
              </Flex>
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

            </Flex>
          </div>
        </div>}
    </>
  )
}

export default ModalReview
