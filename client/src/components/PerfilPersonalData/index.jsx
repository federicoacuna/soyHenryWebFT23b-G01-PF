import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserData } from '../../redux/actions/users.actions'
import {
  Button,
  FormControl,
  FormLabel,
  Text,
  Input,
  Flex,
  Heading
} from '@chakra-ui/react'

export default function UserPersonalData () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const [hasTried, setHasTried] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
    birthdate: ''
  })
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    birthdate: ''
  })

  useEffect(() => {
    setUserData({
      email: user.email,
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      phone: user.phone || '',
      birthdate: user.birthdate || '2000-01-01'
    })
  }, [user]) //eslint-disable-line

  function validate () {
    const error = {}

    setErrors({
      firstname: '',
      lastname: '',
      phone: '',
      birthdate: ''
    })

    // Check First Name - between 3 and 30 characters
    if (!userData.firstname) {
      error.firstname = 'Completar campo.'
    } else if (!/^([a-zA-ZÀ-ÖØ-öø-ÿ]{3,30})+\.?(( |-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/.test(userData.firstname)) {
      error.firstname = 'Nombre inválido.'
    }

    // Check Last Name - between 3 and 30 characters
    // ^[0-9]*$
    if (!userData.lastname) {
      error.lastname = 'Completar campo.'
    } else if (!/^([a-zA-ZÀ-ÖØ-öø-ÿ]{3,30})+\.?(( |-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/.test(userData.lastname)) {
      error.lastname = 'Apellido inválido.'
    }

    if (!userData.phone) {
      error.phone = 'Completar campo.'
    } else if (!/^[0-9]*$/.test(userData.phone)) {
      error.phone = 'Número de móvil inválido.'
    }

    setErrors({
      firstname: error.firstname,
      lastname: error.lastname,
      phone: error.phone,
      birthdate: error.birthdate
    })

    if (Object.values(error).length === 0) { return true }
  }

  function handleChange (e) {
    hasTried && validate()
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  function handleSubmit () {
    setHasTried(true)
    if (validate()) {
      const newData = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone: userData.phone,
        birthdate: userData.birthdate
      }
      dispatch(updateUserData(newData))
    }
  }

  function handleClose () {
    setUserData({
      email: user.email,
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      phone: user.phone || '',
      birthdate: user.birthdate || '2000-01-01'
    })
    setErrors({
      firstname: '',
      lastname: '',
      phone: '',
      birthdate: ''
    })
    setHasTried(false)
  }

  return (
    <Flex justifyContent='center' alignItems='center'>
      <FormControl onSubmit={handleSubmit} isRequired width='75%'>
        <Heading as='h3' size='x1'>DATOS DE SU CUENTA</Heading>
        <FormLabel htmlFor='email'>Tu cuenta de email es</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='email' type='text' value={userData.email || ''} placeholder={userData.email} disabled />

        <Heading as='h4' size='x1'>DATOS PERSONALES</Heading>
        <FormLabel htmlFor='firstname'>Nombres</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='firstname' type='text' value={userData.firstname || ''} placeholder={userData.firstname ? userData.firstname : 'No has registrado nombres aún'} />
        {errors.firstname && <Text color='red'>{errors.firstname}</Text>}

        <FormLabel htmlFor='lastname'>Apellidos</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='lastname' type='text' value={userData.lastname || ''} placeholder={userData.lastname ? userData.lastname : 'No has registrado apellidos aún'} />
        {errors.lastname && <Text color='red'>{errors.lastname}</Text>}

        <FormLabel htmlFor='phone'>Número de movil</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='phone' type='text' value={userData.phone || ''} placeholder={userData.phone ? userData.phone : 'No has registrado tu movil aún'} />
        {errors.phone && <Text color='red'>{errors.phone}</Text>}

        <FormLabel htmlFor='birthdate'>¿Quieres cambiar tu fecha de nacimiento {userData.birthdate}?</FormLabel>
        <Input onChange={(e) => handleChange(e)} name='birthdate' type='date' value={userData.birthdate ? userData.birthdate : '2000-01-01'} />
        {errors.birthname && <Text color='red'>{errors.birthname}</Text>}

        <Flex flexDirection='row' justifyContent='end'>
          <Button m={3} bg='#0082E3' _hover={{ color: 'white', bg: '#0082E3' }} borderRadius='none' color='white' onClick={handleClose}>Cancelar</Button>
          <Button m={3} bg='#0082E3' _hover={{ color: 'white', bg: '#0082E3' }} borderRadius='none' color='white' onClick={handleSubmit}>Guardar</Button>
        </Flex>
      </FormControl>
    </Flex>

  )
}
