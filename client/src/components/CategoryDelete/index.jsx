import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, Select, Flex, Button, Text, useToast } from '@chakra-ui/react'
import { getCategories, removeCategory } from '../../redux/actions'

export default function CategoryAdd () {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)
  const token = useSelector(state => state.token)
  const toast = useToast()
  const [values, setValues] = useState({ categoryId: 0 })
  const [errors, setErrors] = useState({ categoryId: '' })

  useEffect(() => {
    dispatch(getCategories())
  }, [])//eslint-disable-line

  function handleChange (e) {
    setValues({ ...values, categoryId: e.target.value })
  }

  function handleSubmit () {
    if (validate() && token) {
      dispatch(removeCategory(values))
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
    <FormControl onSubmit={handleSubmit} isRequired>
      <Flex flexDirection='row' justifyContent='space-between'>
        <Select mb='1rem' _focus={{ outline: 'none' }} width='20rem' variant='outline' bg='white' value={values.categoryId} onChange={(e) => handleChange(e)} name='categoryId' placeholder='Elija una categoría para borrar'>
          {categories && categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </Select>
        {errors.categoryId && <Text color='red'>{errors.categoryId}</Text>}
        <Flex flexDirection='row' justifyContent='end'>
          <Button m={0} _hover={{ color: 'gray' }} width='6rem' color='#2C2C2E' border='2px' borderColor='#2C2C2E' name='Close' onClick={handleClose}>Cancelar</Button>
          <Button m={0} _hover={{ color: 'gray' }} width='6rem' color='white' bg='#2C2C2E' name='Submit' onClick={handleSubmit}>Borrar</Button>
        </Flex>
      </Flex>
    </FormControl>
  )
}
