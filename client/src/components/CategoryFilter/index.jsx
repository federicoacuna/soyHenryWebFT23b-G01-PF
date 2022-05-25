import { useSelector, useDispatch } from 'react-redux'
import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react'
import { addFilterParams } from '../../redux/actions'

export const CategoryFilter = () => {
  const categories = useSelector(state => state.categories)
  const options = useSelector(state => state.options)
  const dispatch = useDispatch()

  if (categories.length === 0) return <Box>No hay categorías</Box>

  return (
    <Box m='1rem'>
      <Heading size='sm' mb='0.5rem'>Categorías</Heading>
      <UnorderedList ml='0'>
        {categories.map(category => (
          <ListItem
            key={category.id + category.name}
            cursor='pointer'
            onClick={() => dispatch(addFilterParams({ name: 'category', value: category.id }))}
            color={Number(options.category) === category.id ? '#000' : 'gray'}
            textDecor={Number(options.category) === category.id ? 'underline' : undefined}
          >
            {category.name}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default CategoryFilter
