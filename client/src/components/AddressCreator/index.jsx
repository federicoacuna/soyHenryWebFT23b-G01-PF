import React, { useState } from 'react'
import { useDispatch } from 'react-redux' //eslint-disable-line
import { useNavigate } from 'react-router-dom'
import ButtonPrimary from '../ButtonPrimary'
import { createNewAddress } from '../../redux/actions' //eslint-disable-line
import {
  FormControl,
  FormLabel,
  Text,
  Input,
  Flex,
  InputGroup
} from '@chakra-ui/react'

function AddressCreator () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [errors, setErrors] = useState({//eslint-disable-line
    postalCode: '',
    country: '',
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    floorApartment: '',
    deliveryInstruction: ''
  })

  const [values, setValues] = useState({
    postalCode: '',
    country: '',
    state: '',
    city: '',
    streetName: '',
    houseNumber: '',
    floorApartment: '',
    deliveryInstruction: ''
  })

  function handleChange (e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit () {
    validate() && dispatch(createNewAddress(values))
  }

  function validate () {
    const error = {}

    setErrors({
      postalCode: '',
      country: '',
      state: '',
      city: '',
      streetName: '',
      houseNumber: '',
      floorApartment: '',
      deliveryInstruction: ''
    })

    for (const val in values) {
      if (values[val] === '' && val !== 'floorApartment' && val !== 'deliveryInstruction') {
        error[val] = 'Completar campo'
        return false
      }
    }
    setErrors(error)
    return true
  }

  function handleClose () {
    setValues({
      postalCode: '',
      country: '',
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
      <InputGroup>
        <FormLabel htmlFor='first-name'>Codigo postal</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='postalCode' type='text' value={values.postalCode} placeholder='First name' />
        {errors.postalCode && <Text color='red'>{errors.postalCode}</Text>}
      </InputGroup>
      <InputGroup>
        <FormLabel htmlFor='first-name'>Pais</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='country' type='text' value={values.country} placeholder='First name' />
        {errors.country && <Text color='red'>{errors.country}</Text>}
      </InputGroup>
      <InputGroup>
        <FormLabel htmlFor='first-name'>Provincia</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='state' type='text' value={values.state} placeholder='First name' />
        {errors.state && <Text color='red'>{errors.state}</Text>}
      </InputGroup>
      <InputGroup>
        <FormLabel htmlFor='first-name'>Ciudad</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='city' type='text' value={values.city} placeholder='First name' />
        {errors.city && <Text color='red'>{errors.city}</Text>}
      </InputGroup>
      <InputGroup>
        <FormLabel htmlFor='first-name'>Calle</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='streetName' type='text' value={values.streetName} placeholder='First name' />
        {errors.streetName && <Text color='red'>{errors.streetName}</Text>}
      </InputGroup>
      <InputGroup>
        <FormLabel htmlFor='first-name'>Nro de puerta</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='houseNumber' type='number' value={values.houseNumber} placeholder='First name' />
        {errors.houseNumber && <Text color='red'>{errors.houseNumber}</Text>}
      </InputGroup>
      <InputGroup>
        <FormLabel htmlFor='first-name'>Piso / depto</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='floorApartment' type='text' value={values.floorApartment} placeholder='First name' />
        {errors.floorApartment && <Text color='red'>{errors.floorApartment}</Text>}
      </InputGroup>
      <InputGroup>
        <FormLabel htmlFor='first-name'>Instrucciones para el envio</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='deliveryInstruction' type='text' value={values.deliveryInstruction} placeholder='First name' />
        {errors.deliveryInstruction && <Text color='red'>{errors.deliveryInstruction}</Text>}
      </InputGroup>
      <Flex flexDirection='row' justifyContent='center'>
        <ButtonPrimary text='Guardar' onclick={handleSubmit} />
        <ButtonPrimary text='Cancelar' onclick={handleClose} />
      </Flex>
    </FormControl>
  )
}

export default AddressCreator
