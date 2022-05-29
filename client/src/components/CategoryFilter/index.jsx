import { useSelector, useDispatch } from 'react-redux'
import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react'
import { addProductFilter } from '../../redux/actions/products.actions'
import { useEffect } from 'react'
import { getCategoriesList } from '../../redux/actions/categories.actions'

export const CategoryFilter = () => {
  const categories = useSelector(state => state.categories.data)
  const filters = useSelector(state => state.products.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoriesList())
  }, [])//eslint-disable-line

  if (!categories || categories.length === 0) return <Box>No hay categorías</Box>

  return (
    <Box m='1rem'>
      <Heading size='sm' mb='0.5rem'>Categorías</Heading>
      <UnorderedList ml='0' listStyleType='none'>
        {Array.isArray(categories) && categories.map(category => (
          <ListItem
            key={category.id + category.name}
            cursor='pointer'
            onClick={() => dispatch(addProductFilter({ name: 'category', value: category.id }))}
            color={Number(filters.category) === category.id ? '#000' : 'gray'}
          >
            {category.name}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default CategoryFilter
