import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonPrimary from '../ButtonPrimary'
import { createNewAddress, getCountries } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl,
  FormLabel,
  Text,
  Input,
  Flex,
  Select
} from '@chakra-ui/react'

function AddressCreator () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const countries = useSelector(state => state.countries)
  const [hasTried, setHasTried] = useState(false)
  const [errors, setErrors] = useState({//eslint-disable-line
    postalCode: '',
    countryName: '',
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
    countryName: '',
    countryId: 1,
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    floorApartment: '',
    deliveryInstructions: ''
  })

  useEffect(() => {
    hasTried && validate()
    dispatch(getCountries())
  }, [values]) //eslint-disable-line

  function handleChange (e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit () {
    setHasTried(true)
    values.countryId = countries.filter(c => c.countryName === values.countryName)[0].id
    console.log('Estoy en AddressCreator:', values)
    validate() && dispatch(createNewAddress(values))
    navigate('/addresses')
  }

  function validate () {
    const error = {}

    setErrors({
      postalCode: '',
      countryName: '',
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
    if (values.countryName === '') {
      error.countryName = 'Completar campo'
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
      countryName: error.countryName,
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
      countryName: '',
      countryId: '',
      state: '',
      city: '',
      streetName: '',
      houseNumber: '',
      floorApartment: '',
      deliveryInstructions: ''
    })
    navigate('/addresses')
  }

  return (
    <FormControl onSubmit={handleSubmit} isRequired>

      <FormLabel htmlFor='postalcode'>Codigo postal</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='postalCode' type='text' value={values.postalCode} placeholder='Ingrese el código postal' />
      {errors.postalCode && <Text color='red'>{errors.postalCode}</Text>}

      <FormLabel htmlFor='countryName'>Pais</FormLabel>
      <Select onChange={(e) => handleChange(e)} name='countryName' placeholder='Elija un país para el envío'>
        {countries.map(country => <option key={country.id} value={country.countryName}>{country.countryName}</option>)}
      </Select>
      {errors.countryName && <Text color='red'>{errors.countryName}</Text>}

      <FormLabel htmlFor='state'>Provincia</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='state' type='text' value={values.state} placeholder='Ingrese el nombre de la Prvincia' />
      {errors.state && <Text color='red'>{errors.state}</Text>}

      <FormLabel htmlFor='city'>Ciudad</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='city' type='text' value={values.city} placeholder='Ingrese el nombre de la ciudad' />
      {errors.city && <Text color='red'>{errors.city}</Text>}

      <FormLabel htmlFor='streetName'>Calle</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='streetName' type='text' value={values.streetName} placeholder='Ingrese nombre de la calle' />
      {errors.streetName && <Text color='red'>{errors.streetName}</Text>}

      <FormLabel htmlFor='houseNumber'>Nro de puerta</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='houseNumber' type='number' value={values.houseNumber} placeholder='Ingrese número de puerta del domicilio' />
      {errors.houseNumber && <Text color='red'>{errors.houseNumber}</Text>}

      <FormLabel htmlFor='floorApartment'>Piso / depto</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='floorApartment' type='text' value={values.floorApartment} placeholder='Ingrese número de apartamento si aplica' />
      {errors.floorApartment && <Text color='red'>{errors.floorApartment}</Text>}

      <FormLabel htmlFor='deliveryInstructions'>Instrucciones para el envio</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='deliveryInstructions' type='text' value={values.deliveryInstructions} placeholder='Ingrese instruccione adicionales para el envío si aplica' />
      {errors.deliveryInstructions && <Text color='red'>{errors.deliveryInstructions}</Text>}

      <Flex flexDirection='row' justifyContent='center'>
        <ButtonPrimary text='Guardar' onclick={handleSubmit} />
        <ButtonPrimary text='Cancelar' onclick={handleClose} />
      </Flex>
    </FormControl>
  )
}

export default AddressCreator
