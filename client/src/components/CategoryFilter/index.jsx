import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react'

export const CategoryFilter = () => {
  return (
    <Box>
      <Heading size='sm' mb='0.5rem'>Categorías:</Heading>
      <UnorderedList ml='0'>
        <ListItem>Categoria 1</ListItem>
        <ListItem>Categoria 2</ListItem>
        <ListItem>Categoria 3</ListItem>
        <ListItem>Categoria 4</ListItem>
        <ListItem>Categoria 5</ListItem>
      </UnorderedList>
    </Box>
  )
}

export default CategoryFilter
