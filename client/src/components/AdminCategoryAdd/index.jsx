import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormControl, Input, Flex, Button, Text, useToast } from '@chakra-ui/react'
import { createNewCategory } from '../../redux/actions/categories.actions'

export default function AdminCategoryAdd () {
  const dispatch = useDispatch()
  const [hasTried, setHasTried] = useState(false)
  const token = useSelector(state => state.users.token)
  const [category, setCategory] = useState({ name: '' })
  const [errors, setErrors] = useState({ name: '' })
  const toast = useToast()

  function validate () {
    const error = {}

    setErrors({
      name: ''
    })

    // Check Name - between 3 and 30 characters
    if (!category.name) {
      error.name = 'Completar campo.'
    } else if (!/^([a-zA-ZÀ-ÖØ-öø-ÿ]{3,30})+\.?(( |-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/.test(category.name)) {
      error.name = 'Nombre inválido. Sólo letras y más de 3 caracteres.'
    }

    setErrors({
      name: error.name
    })

    if (Object.values(error).length === 0) { return true }
  }

  function handleChange (e) {
    hasTried && validate()
    setCategory({ ...category, name: e.target.value })
  }

  function handleSubmit () {
    setHasTried(true)
    if (validate() && token) {
      dispatch(createNewCategory(category))
      setCategory({ name: '' })
    } else {
      toast({
        title: 'Falta información.',
        description: 'Por favor complete correctamente el campo.',
        status: 'error',
        duration: 7000,
        isClosable: true
      })
    }
  }

  function handleClose () {
    setCategory({ name: '' })
    setErrors({ name: '' })
    setHasTried(false)
  }

  return (
    <FormControl onSubmit={handleSubmit} isRequired>
      <Flex flexDirection='row' justifyContent='space-between'>
        <Flex flexDirection='column' justifyContent='start'>
          <Input onChange={(e) => handleChange(e)} htmlSize={4} width='20rem' variant='outline' bg='white' name='name' type='text' value={category.name || ''} placeholder={category.name ? category.name : 'Ingrese nombre de categoría'} />
          {errors.name && <Text color='red'>{errors.name}</Text>}
        </Flex>
        <Flex flexDirection='row' justifyContent='end' gap='1rem'>
          <Button m={0} _hover={{ color: 'gray' }} borderRadius='none' width='6rem' color='#2C2C2E' border='2px' borderColor='#2C2C2E' onClick={handleClose}>Cancelar</Button>
          <Button m={0} _hover={{ color: 'gray' }} borderRadius='none' width='6rem' color='white' bg='#2C2C2E' onClick={handleSubmit}>Agregar</Button>
        </Flex>
      </Flex>
    </FormControl>
  )
}
