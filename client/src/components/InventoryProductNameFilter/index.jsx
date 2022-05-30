import React, { useState } from 'react'
import { Input, useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { addProductFilter } from '../../redux/actions/products.actions'

const InventoryProductNameFilter = () => {
  const dispatch = useDispatch()
  const [item, setItem] = useState('')
  const toast = useToast()

  function handleInputChange (e) {
    setItem(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    if (item.length === 0) {
      return (
        toast({
          title: 'Ocurrió un error',
          description: 'Por favor, ingresa el nombre del producto.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      )
    } else {
      dispatch(addProductFilter({ name: 'search', value: item }))
      setItem('')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input mb='1rem' placeholder='Buscar producto...' onChange={handleInputChange} value={item} />
    </form>
  )
}

export default InventoryProductNameFilter
