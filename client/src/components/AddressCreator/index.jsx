import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createNewAddress } from '../../redux/actions/addresses.actions'
import { useDispatch } from 'react-redux'
import {
  FormControl,
  FormLabel,
  Text,
  Input,
  Flex,
  Button
} from '@chakra-ui/react'
import { setToast } from '../../redux/actions'

function AddressCreator () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [hasTried, setHasTried] = useState(false)
  const [errors, setErrors] = useState({
    postalCode: '',
    countryId: '',
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    floorApartment: '',
    deliveryInstructions: ''
  })

  const [values, setValues] = useState({
    postalCode: '',
    countryId: '',
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    floorApartment: '',
    deliveryInstructions: ''
  })

  useEffect(() => {
    hasTried && validate()
  }, [values]) //eslint-disable-line

  function handleChange (e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit () {
    setHasTried(true)
    if (validate()) {
      dispatch(createNewAddress(values))
      navigate('/addresses')
    } else {
      dispatch(setToast({
        title: 'Falta informacion.',
        description: 'Por favor completa los campos obligatorios.',
        status: 'error',
        duration: 7000,
        isClosable: true
      }))
    }
  }

  function handleClose () {
    navigate('/addresses')
  }
  function validate () {
    const error = {}

    setErrors({
      postalCode: '',
      countryId: '',
      state: '',
      city: '',
      streetName: '',
      houseNumber: '',
      floorApartment: '',
      deliveryInstructions: ''
    })

    if (values.postalCode === '') {
      error.postalCode = 'Completar campo'
    }
    if (values.countryId === '') {
      error.countryId = 'Completar campo'
    }
    if (values.city === '') {
      error.city = 'Completar campo'
    }
    if (values.streetName === '') {
      error.streetName = 'Completar campo'
    }
    if (values.houseNumber === '') {
      error.houseNumber = 'Completar campo'
    }
    if (values.state === '') {
      error.state = 'Completar campo'
    }

    setErrors({
      ...values,
      postalCode: error.postalCode,
      countryId: error.countryId,
      state: error.state,
      city: error.city,
      streetName: error.streetName,
      houseNumber: error.houseNumber
    })

    if (Object.values(error).length === 0) { return true }
  }

  return (
    <FormControl onSubmit={handleSubmit} isRequired>

      <FormLabel htmlFor='first-name'>Codigo postal</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='postalCode' type='text' value={values.postalCode} placeholder='First name' />
      {errors.postalCode && <Text color='red'>{errors.postalCode}</Text>}

      <FormLabel htmlFor='first-name'>Pais</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='countryId' type='number' value={values.countryId} placeholder='First name' />
      {errors.countryId && <Text color='red'>{errors.countryId}</Text>}

      <FormLabel htmlFor='first-name'>Provincia</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='state' type='text' value={values.state} placeholder='First name' />
      {errors.state && <Text color='red'>{errors.state}</Text>}

      <FormLabel htmlFor='first-name'>Ciudad</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='city' type='text' value={values.city} placeholder='First name' />
      {errors.city && <Text color='red'>{errors.city}</Text>}

      <FormLabel htmlFor='first-name'>Calle</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='streetName' type='text' value={values.streetName} placeholder='First name' />
      {errors.streetName && <Text color='red'>{errors.streetName}</Text>}

      <FormLabel htmlFor='first-name'>Nro de puerta</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='houseNumber' type='number' value={values.houseNumber} placeholder='First name' />
      {errors.houseNumber && <Text color='red'>{errors.houseNumber}</Text>}

      <FormLabel htmlFor='first-name'>Piso / depto</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='floorApartment' type='text' value={values.floorApartment} placeholder='First name' />
      {errors.floorApartment && <Text color='red'>{errors.floorApartment}</Text>}

      <FormLabel htmlFor='first-name'>Instrucciones para el envio</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='deliveryInstructions' type='text' value={values.deliveryInstructions} placeholder='First name' />
      {errors.deliveryInstructions && <Text color='red'>{errors.deliveryInstructions}</Text>}

      <Flex flexDirection='row' justifyContent='center'>
        <Button onClick={handleClose} name='Cancel'>Cancelar</Button>
        <Button onClick={handleSubmit} name='Submit'>Guardar</Button>
      </Flex>
    </FormControl>
  )
}

export default AddressCreator
