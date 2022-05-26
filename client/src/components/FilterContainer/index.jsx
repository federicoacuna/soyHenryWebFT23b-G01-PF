import CategoryFilter from '../CategoryFilter'
import PriceFilter from '../PriceFilter'
import BrandFilter from '../BrandFilter'
import { Box } from '@chakra-ui/react'

const FilterContainer = () => {
  return (
    <Box boxShadow='md' gap='2rem' padding='2rem' width='300px' mt='2rem' height='max-content'>
      <CategoryFilter />
      <PriceFilter />
      <BrandFilter />
    </Box>
  )
}

export default FilterContainer
