import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react'

export default function BrandFilter () {
  return (
    <Box mb='1rem'>
      <Heading size='sm' mb='0.5rem'>Marcas:</Heading>
      <UnorderedList ml='0'>
        <ListItem>Marca 1</ListItem>
        <ListItem>Marca 2</ListItem>
        <ListItem>Marca 3</ListItem>
        <ListItem>Marca 4</ListItem>
        <ListItem>Marca 5</ListItem>
      </UnorderedList>
    </Box>
  )
}
