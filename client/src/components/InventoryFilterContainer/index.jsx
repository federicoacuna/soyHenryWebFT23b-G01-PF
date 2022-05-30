import React from 'react'
import InventoryCategoryFilter from '../InventoryCategoryFilter'
import { Flex, Button, Tooltip } from '@chakra-ui/react'
import InventoryBrandFilter from '../InventoryBrandFilter'
import InventoryProductNameFilter from '../InventoryProductNameFilter'
import { FcClearFilters } from 'react-icons/fc'
import { clearProductFilter } from '../../redux/actions/products.actions'
import { useDispatch } from 'react-redux'

const InventoryFilterContainer = () => {
  const dispatch = useDispatch()
  return (
    <Flex flexDirection='column'>
      <InventoryProductNameFilter />
      <Flex>
        <InventoryCategoryFilter />
        <InventoryBrandFilter />
        <Tooltip label='Limpiar filtros'><Button onClick={() => dispatch(clearProductFilter())} ml='1rem' bg='primary' color='white' w='20%'><FcClearFilters /></Button></Tooltip>
      </Flex>
    </Flex>
  )
}

export default InventoryFilterContainer
