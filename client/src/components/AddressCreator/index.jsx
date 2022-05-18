import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' //eslint-disable-line
import { useNavigate } from 'react-router-dom'
import ButtonPrimary from '../ButtonPrimary'
import Addresses from '../../services/addresses'//eslint-disable-line
import {
  FormControl,
  FormLabel,
  FormErrorMessage, //eslint-disable-line
  FormHelperText, //eslint-disable-line
  Text,
  Input,
  Flex
} from '@chakra-ui/react'

function AddressCreator () {
  const navigate = useNavigate()

  const [hasTried, setHasTried] = useState(false)
  const [errors, setErrors] = useState({//eslint-disable-line
    postalCode: '',
    countryId: '',
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    floorApartment: '',
    deliveryInstruction: ''
  })

  const [values, setValues] = useState({
    postalCode: '',
    countryId: '',
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    floorApartment: '',
    deliveryInstruction: ''
  })

  useEffect(() => {
    hasTried && validate()
  }, [values]) //eslint-disable-line

  function handleChange (e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit () {
    setHasTried(true)
    validate() && Addresses(values)
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
      deliveryInstruction: ''
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

  function handleClose () {
    setValues({
      postalCode: '',
      countryId: '',
      state: '',
      city: '',
      streetName: '',
      houseNumber: '',
      floorApartment: '',
      deliveryInstruction: ''
    })
    navigate('/cart')
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
      <Input onChange={(e) => handleChange(e)} name='deliveryInstruction' type='text' value={values.deliveryInstruction} placeholder='First name' />
      {errors.deliveryInstruction && <Text color='red'>{errors.deliveryInstruction}</Text>}

      <Flex flexDirection='row' justifyContent='center'>
        <ButtonPrimary text='Guardar' onclick={handleSubmit} />
        <ButtonPrimary text='Cancelar' onclick={handleClose} />
      </Flex>
    </FormControl>
  )
}

export default AddressCreator
