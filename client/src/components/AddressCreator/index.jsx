import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonPrimary from '../ButtonPrimary'
import { getCountries } from '../../redux/actions'
import { createNewAddress } from '../../redux/actions/addresses.actions'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl,
  FormLabel,
  Text,
  Input,
  Flex,
  Select,
  useToast
} from '@chakra-ui/react'

function AddressCreator () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const countries = useSelector(state => state.countries)
  const [hasTried, setHasTried] = useState(false)
  const [errors, setErrors] = useState({
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
  const toast = useToast()

  useEffect(() => {
    dispatch(getCountries())
  }, [])//eslint-disable-line

  useEffect(() => {
    hasTried && validate()
    console.log(values)
  }, [values]) //eslint-disable-line

  function handleChange (e) {
    console.log(e.target.name)
    console.log(e.target.value)
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit () {
    setHasTried(true)
    if (validate()) {
      dispatch(createNewAddress(values))
      navigate('/addresses')
    } else {
      toast({
        title: 'Falta informacion.',
        description: 'Por favor completa los campos obligatorios.',
        status: 'error',
        duration: 7000,
        isClosable: true
      })
    }
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
    if (values.countryId === '') {
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
    navigate('/addresses')
  }

  return (
    <FormControl onSubmit={handleSubmit} isRequired>

      <FormLabel htmlFor='postalcode'>Codigo postal</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='postalCode' type='text' value={values.postalCode} placeholder='Ingrese el código postal' />
      {errors.postalCode && <Text color='red'>{errors.postalCode}</Text>}

      <FormLabel htmlFor='countryName'>Pais</FormLabel>
      <Select onChange={(e) => handleChange(e)} name='countryId' placeholder='Elija un país para el envío'>
        {countries.map(country => <option key={country.id} value={country.id}>{country.countryName}</option>)}
      </Select>
      {errors.countryName && <Text color='red'>{errors.countryName}</Text>}

      <FormLabel htmlFor='state'>Provincia</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='state' type='text' value={values.state} placeholder='Ingrese el nombre de la Provincia' />
      {errors.state && <Text color='red'>{errors.state}</Text>}

      <FormLabel htmlFor='city'>Ciudad</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='city' type='text' value={values.city} placeholder='Ingrese el nombre de la ciudad' />
      {errors.city && <Text color='red'>{errors.city}</Text>}

      <FormLabel htmlFor='streetName'>Calle</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='streetName' type='text' value={values.streetName} placeholder='Ingrese el nombre de la calle' />
      {errors.streetName && <Text color='red'>{errors.streetName}</Text>}

      <FormLabel htmlFor='houseNumber'>Nro de puerta</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='houseNumber' type='number' value={values.houseNumber} placeholder='Ingrese el número de puerta del domicilio' />
      {errors.houseNumber && <Text color='red'>{errors.houseNumber}</Text>}

      <FormLabel htmlFor='floorApartment'>Piso / depto</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='floorApartment' type='text' value={values.floorApartment} placeholder='Ingrese el número de apartamento si aplica' />
      {errors.floorApartment && <Text color='red'>{errors.floorApartment}</Text>}

      <FormLabel htmlFor='deliveryInstructions'>Instrucciones para el envio</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='deliveryInstructions' type='text' value={values.deliveryInstructions} placeholder='Ingrese instrucciones adicionales para el envío si aplican' />
      {errors.deliveryInstructions && <Text color='red'>{errors.deliveryInstructions}</Text>}

      <Flex flexDirection='row' justifyContent='center'>
        <ButtonPrimary text='Guardar' onclick={handleSubmit} />
        <ButtonPrimary text='Cancelar' onclick={handleClose} />
      </Flex>
    </FormControl>
  )
}

export default AddressCreator
