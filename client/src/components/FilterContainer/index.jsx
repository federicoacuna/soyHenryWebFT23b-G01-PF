import CategoryFilter from '../CategoryFilter'
import PriceFilter from '../PriceFilter'
import BrandFilter from '../BrandFilter'
import { Box, Heading } from '@chakra-ui/react'

const FilterContainer = () => {
  return (
    <Box bg='secondary' padding='2rem' boxShadow='3px 3px 5px 1px rgba(0,0,0,0.25)' borderRadius='1rem' height='max-content'>
      <Heading size='md' mb='1rem' textTransform='uppercase'>Filtros</Heading>
      <CategoryFilter />
      <PriceFilter />
      <BrandFilter />
    </Box>
  )
}

export default FilterContainer
