import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, Select, Flex, Button, Text, useToast } from '@chakra-ui/react'
import { removeCategory } from '../../redux/actions/categories.actions'

export default function AdminCategoryAdd () {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.data)
  const token = useSelector(state => state.users.token)
  const toast = useToast()
  const [values, setValues] = useState({ categoryId: 0 })
  const [errors, setErrors] = useState({ categoryId: '' })

  function handleChange (e) {
    setValues({ ...values, categoryId: e.target.value })
  }

  function handleSubmit () {
    if (validate() && token) {
      dispatch(removeCategory(values.categoryId))
      setValues({ categoryId: 0 })
    } else {
      toast({
        title: 'Falta informacion.',
        description: 'Por favor seleccione una categoría a borrar.',
        status: 'error',
        duration: 7000,
        isClosable: true
      })
    }
  }

  function handleClose () {
    setValues({ categoryId: 0 })
    setErrors({ categoryId: '' })
  }

  function validate () {
    const error = {}
    setErrors({
      categoryId: ''
    })
    if (values.categoryId === 0) {
      error.categoryId = 'Por favor elija una categoría'
    }
    setErrors({
      categoryId: error.categoryId
    })
    if (Object.values(error).length === 0) { return true }
  }

  return (
    <FormControl onSubmit={handleSubmit} isRequired mt='1rem'>
      <Flex flexDirection='row' justifyContent='space-between'>
        <Select mb='1rem' _focus={{ outline: 'none' }} width='20rem' variant='outline' bg='white' value={values.categoryId} onChange={(e) => handleChange(e)} name='categoryId' placeholder='Elija una categoría para borrar'>
          {categories && categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </Select>
        {errors.categoryId && <Text color='red'>{errors.categoryId}</Text>}
        <Flex flexDirection='row' justifyContent='end' gap='1rem'>
          <Button m={0} _hover={{ color: 'gray' }} borderRadius='none' width='6rem' color='#2C2C2E' border='2px' borderColor='#2C2C2E' name='Close' onClick={handleClose}>Cancelar</Button>
          <Button m={0} _hover={{ color: 'gray' }} borderRadius='none' width='6rem' color='white' bg='#2C2C2E' name='Submit' onClick={handleSubmit}>Borrar</Button>
        </Flex>
      </Flex>
    </FormControl>
  )
}
