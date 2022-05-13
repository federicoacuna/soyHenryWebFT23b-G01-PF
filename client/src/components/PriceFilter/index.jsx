import { Box, Heading, Flex, Input } from '@chakra-ui/react'

const PriceFilter = () => {
  return (
    <Box mb='1rem'>
      <Heading size='sm' mb='0.5rem'>Rango de precio:</Heading>
      <Flex columnGap='1rem' justifyContent='space-around'>
        <Input
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
