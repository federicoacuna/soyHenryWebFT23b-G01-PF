import { Box, Heading, Flex, Input } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addFilterParams } from '../../redux/actions'

const PriceFilter = () => {
  const dispatch = useDispatch()
  const options = useSelector(state => state.options)

  function handleChange (e) {
    dispatch(addFilterParams({ name: e.target.name, value: e.target.value.replace(/\D/g, '') }))
  }

  return (
    <Box mb='1rem'>
      <Heading size='sm' mb='0.5rem'>Rango de precio:</Heading>
      <Flex columnGap='1rem' justifyContent='space-around'>
        <Input
          onChange={handleChange}
          value={options.minPrice || ''}
          name='minPrice'
          type='text'
          placeholder='Mínimo'
          size='xs'
          bg='accent'
          borderRadius='0.5rem'
          w='5rem'
          textAlign='center'
          _focus
        />

        <Input
          onChange={handleChange}
          value={options.maxPrice || ''}
          name='maxPrice'
          type='text'
          placeholder='Máximo'
          size='xs'
          bg='accent'
          borderRadius='0.5rem'
          w='5rem'
          textAlign='center'
          _focus
        />
      </Flex>
    </Box>
  )
}

export default PriceFilter
