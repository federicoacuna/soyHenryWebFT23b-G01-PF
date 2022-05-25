import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/actions'
import { Flex, Box, SimpleGrid } from '@chakra-ui/react'

export default function AdminCategoryList () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [])//eslint-disable-line

  const productsCategories = useSelector(state => state.categories)

  return (
    <>
      <Flex alignItems='center' bg='white' borderRadius={3} mt={2} mb={2}>
        <Flex w='100%' alignItems='center'>
          <Box m={4}>
            <SimpleGrid columns={[2, null, 4]} spacingX={6} spacingY={2}>
              {productsCategories && productsCategories.map(category => (
                <Box bg='#E2E8F0' width={120} height={8} textAlign='center' key={category.id}>{category.name}</Box>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
