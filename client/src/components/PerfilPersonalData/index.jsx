import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserData } from '../../redux/actions'
import ButtonPrimary from '../ButtonPrimary'
import {
  FormControl,
  FormLabel,
  Text,
  Input,
  Flex,
  Heading
} from '@chakra-ui/react'

export default function UserPersonalData () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
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
      ...userData,
      email: user.email /* ? user.email : 'ecommerce@ecommerce.com' */,
      firstname: user.firstname ? user.firstname : '',
      lastname: user.lastname ? user.lastname : '',
      phone: user.phone ? user.phone : '',
      birthdate: user.birthdate ? user.birthdate : '2000-01-01'
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
    if (!userData.lastname) {
      error.lastname = 'Completar campo.'
    } else if (!/^([a-zA-ZÀ-ÖØ-öø-ÿ]{3,30})+\.?(( |-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/.test(userData.lastname)) {
      error.lastname = 'Apellido inválido.'
    }

    setErrors({
      ...userData,
      firstname: error.firstname,
      lastname: error.lastname,
      phone: error.phone,
      birthdate: error.birthdate
    })

    if (Object.values(error).length === 0) { return true }
  }

  function handleChange (e) {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  function handleSubmit () {
    const newData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      phone: userData.phone,
      birthdate: userData.birthdate
    }
    validate() && dispatch(updateUserData(newData))
    // REFRESH DATA FROM REDUX TO FORM
  }

  function handleClose () {
    // REFRESH DATA FROM REDUX TO FORM
  }

  return (
    <FormControl onSubmit={handleSubmit} isRequired>
      <Heading as='h2' size='x1'>DATOS DE SU CUENTA</Heading>
      <FormLabel htmlFor='email'>Su cuenta de email es</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='email' type='text' value={userData.email} placeholder={userData.email} disabled />

      <Heading as='h2' size='x1'>DATOS PERSONALES</Heading>
      <FormLabel htmlFor='firstname'>Nombres</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='firstname' type='text' value={userData.firstname} placeholder={userData.firstname ? userData.firstname : 'No has registrado nombres aún'} />
      {errors.firstname && <Text color='red'>{errors.firstname}</Text>}

      <FormLabel htmlFor='lastname'>Apellidos</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='lastname' type='text' value={userData.lastname} placeholder={userData.lastname ? userData.lastname : 'No has registrado apellidos aún'} />
      {errors.lastname && <Text color='red'>{errors.lastname}</Text>}

      <FormLabel htmlFor='phone'>Número de movil</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='phone' type='text' value={userData.phone} placeholder={userData.phone ? userData.phone : 'No has registrado tu movil aún'} />
      {errors.phone && <Text color='red'>{errors.phone}</Text>}

      <FormLabel htmlFor='birthdate'>¿Quieres cambiar tu fecha de nacimiento {userData.birthdate}?</FormLabel>
      <Input onChange={(e) => handleChange(e)} name='birthdate' type='date' value={userData.birthdate ? userData.birthdate : '2000-01-01'} />
      {errors.birthname && <Text color='red'>{errors.birthname}</Text>}

      <Flex flexDirection='row' justifyContent='end'>
        <ButtonPrimary text='Guardar' onclick={handleSubmit} />
        <ButtonPrimary text='Cancelar' onclick={handleClose} />
      </Flex>
    </FormControl>
  )
}
