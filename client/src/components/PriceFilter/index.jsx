import { Box, Heading, Flex, Input } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductFilter } from '../../redux/actions/products.actions'

const PriceFilter = () => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.products.filter)

  function handleChange (e) {
    dispatch(addProductFilter({ name: e.target.name, value: e.target.value.replace(/\D/g, '') }))
  }

  return (
    <Box m='1rem'>
      <Heading size='sm' mb='0.5rem'>Precio</Heading>
      <Flex columnGap='1rem' justifyContent='space-around'>
        <Input
          onChange={handleChange}
          value={filters.minPrice || ''}
          name='minPrice'
          type='text'
          placeholder='Mínimo'
          size='xs'
          bg='white'
          borderRadius='0.3rem'
          w='5rem'
          textAlign='center'
          _focus
        />

        <Input
          onChange={handleChange}
          value={filters.maxPrice || ''}
          name='maxPrice'
          type='text'
          placeholder='Máximo'
          size='xs'
          bg='white'
          borderRadius='0.3rem'
          w='5rem'
          textAlign='center'
          _focus
        />
      </Flex>
    </Box>
  )
}

export default PriceFilter
