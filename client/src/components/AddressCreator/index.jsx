import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCountriesList } from '../../redux/actions/countries.actions'
import { createNewAddress } from '../../redux/actions/addresses.actions'
import { useDispatch, useSelector } from 'react-redux'
import {
  FormControl,
  Text,
  Input,
  Flex,
  Select,
  useToast,
  Button,
  Box
} from '@chakra-ui/react'

function AddressCreator ({ handleClickAddress }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const countries = useSelector(state => state.countries.data)
  const token = useSelector(state => state.users.token)
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
    countryId: 0,
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    floorApartment: '',
    deliveryInstructions: ''
  })
  const toast = useToast()

  useEffect(() => {
    dispatch(getCountriesList())
  }, [])//eslint-disable-line

  useEffect(() => {
    hasTried && validate()
  }, [values]) //eslint-disable-line

  function handleChange (e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit (e) {
    if (e.target.name === 'Close' && handleClickAddress) {
      setValues({
        postalCode: '',
        countryId: 0,
        state: '',
        city: '',
        streetName: '',
        houseNumber: '',
        floorApartment: '',
        deliveryInstructions: ''
      })
      return handleClickAddress()
    }
    if (e.target.name === 'Close' && !handleClickAddress) {
      return navigate(-1)
    }

    setHasTried(true)
    if (validate() && token) {
      dispatch(createNewAddress(values))
      if (handleClickAddress) return handleClickAddress()
      navigate(-1)
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
      countryId: '',
      state: '',
      city: '',
      streetName: '',
      houseNumber: '',
      floorApartment: '',
      deliveryInstructions: ''
    })

    if (values.postalCode === '') {
      error.postalCode = 'Por favor complete el codigo postal'
    }
    if (values.countryId === 0) {
      error.countryId = 'Por favor elija un pais '
    }
    if (values.city === '') {
      error.city = 'Por favor complete la ciudad'
    }
    if (values.streetName === '') {
      error.streetName = 'Por favor complete el nombre de la calle'
    }
    if (values.houseNumber === '') {
      error.houseNumber = 'Por favor el numero de puerta'
    }
    if (values.state === '') {
      error.state = 'Por favor complete su provincia / estado'
    }

    setErrors({
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
    <Box mt='1rem' display='flex' justifyContent='center' alignSelf='center'>
      <Box>
        <FormControl display='flex' flexDirection='column' justifyContent='center' alignItems='center' p='1rem' borderRadius='0.8rem' width='30rem' bg='white' boxShadow='3px 3px 5px 1px rgba(0, 0, 0, 0.25)' onSubmit={handleSubmit} isRequired>

          <Input mb='1rem' _focus={{ outline: 'none' }} onChange={(e) => handleChange(e)} name='postalCode' type='text' value={values.postalCode} placeholder='Ingrese el código postal' />
          {errors.postalCode && <Text color='red'>{errors.postalCode}</Text>}

          <Select mb='1rem' _focus={{ outline: 'none' }} onChange={(e) => handleChange(e)} name='countryId' placeholder='Elija un país para el envío'>
            {countries && countries.map(country => <option key={country.id} value={country.id}>{country.countryName}</option>)}
          </Select>
          {errors.countryId && <Text color='red'>{errors.countryId}</Text>}

          <Input mb='1rem' _focus={{ outline: 'none' }} onChange={(e) => handleChange(e)} name='state' type='text' value={values.state} placeholder='Ingrese el nombre de la Provincia' />
          {errors.state && <Text color='red'>{errors.state}</Text>}

          <Input mb='1rem' _focus={{ outline: 'none' }} onChange={(e) => handleChange(e)} name='city' type='text' value={values.city} placeholder='Ingrese el nombre de la ciudad' />
          {errors.city && <Text color='red'>{errors.city}</Text>}

          <Input mb='1rem' _focus={{ outline: 'none' }} onChange={(e) => handleChange(e)} name='streetName' type='text' value={values.streetName} placeholder='Ingrese el nombre de la calle' />
          {errors.streetName && <Text color='red'>{errors.streetName}</Text>}

          <Input mb='1rem' _focus={{ outline: 'none' }} onChange={(e) => handleChange(e)} name='houseNumber' type='number' value={values.houseNumber} placeholder='Ingrese el número de puerta del domicilio' />
          {errors.houseNumber && <Text color='red'>{errors.houseNumber}</Text>}

          <Input mb='1rem' _focus={{ outline: 'none' }} onChange={(e) => handleChange(e)} name='floorApartment' type='text' value={values.floorApartment} placeholder='Ingrese el número de apartamento si aplica' />
          {errors.floorApartment && <Text color='red'>{errors.floorApartment}</Text>}

          <Input mb='1rem' _focus={{ outline: 'none' }} onChange={(e) => handleChange(e)} name='deliveryInstructions' type='text' value={values.deliveryInstructions} placeholder='Ingrese instrucciones adicionales para el envío si aplican' />
          {errors.deliveryInstructions && <Text color='red'>{errors.deliveryInstructions}</Text>}
        </FormControl>
        <Flex mt='1rem' width='30rem' flexDirection='row' justifyContent='flex-end' alignItems='center'>
          <Button m={3} bg='#0082E3' _hover={{ color: 'white', bg: '#0082E3' }} borderRadius='none' color='white' onClick={handleSubmit}>Cancelar</Button>
          <Button m={3} bg='#0082E3' _hover={{ color: 'white', bg: '#0082E3' }} borderRadius='none' color='white' onClick={handleSubmit}>Guardar</Button>
        </Flex>
      </Box>

    </Box>

  )
}

export default AddressCreator
