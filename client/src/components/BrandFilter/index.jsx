import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addProductFilter } from '../../redux/actions/products.actions'
import { getBrandsList } from '../../redux/actions/brands.action'
import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react'

export default function BrandFilter () {
  const brands = useSelector(state => state.brands.data)
  const options = useSelector(state => state.products.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBrandsList())
  }, [])//eslint-disable-line

  if (!brands || brands.length === 0) return <Box>No hay marcas</Box>

  return (
    <Box m='1rem'>
      <Heading size='sm' mb='0.5rem'>Marcas</Heading>
      <UnorderedList ml='0' listStyleType='none'>
        {brands.map(brand => (
          <ListItem
            key={brand.id + brand.name}
            cursor='pointer'
            onClick={() => dispatch(addProductFilter({ name: 'brand', value: brand.id }))}
            color={Number(options.brand) === brand.id ? '#000' : 'gray'}
          >
            {brand.name}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}
