import React, { useEffect } from 'react' //eslint-disable-line
import s from '../ModalLogin/index.module.css'
import { Stack, InputGroup, Input, Button, Flex, Text, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAlternateEmail, MdOutlineLock } from 'react-icons/md'
import { getWishList, logIn } from '../../redux/actions' //eslint-disable-line
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useDispatch } from 'react-redux'

export const ModalLogin = ({ children, state, setState, isRegistrando, setIsRegistrando }) => {
  const dispatch = useDispatch() //eslint-disable-line
  // TOAST DE CHAKRA
  const toast = useToast()

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    passwordRegister: ''
  })
  const [errors, setErrors] = React.useState({
    email: '',
    password: ''
  })
  const [show, setShow] = React.useState(false)

  // USE EFFECT CON EL DISPATCH DE LOGIN & LA FN DE VALIDATE

  useEffect(() => {
    validate()
  }, [values]) //eslint-disable-line

  // HANDLES
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleClick = () => {
    setState(false)
    setValues({
      email: '',
      password: ''
    })
  }

  const handleSubmit = () => {
    if (!values.email || !values.password) {
      toast({
        description: 'E-mail y contraseña son requeridos.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
    const correo = values.email
    const password = values.password

    if (isRegistrando) {
      handleLogIn('register', correo, password)
    }
    if (!isRegistrando) {
      handleLogIn('email', correo, password)
    }
    handleClick()
  }

  const ShowPassword = () => {
    setShow(!show)
  }

  const validate = () => {
    const error = {}

    setErrors({
      email: '',
      password: ''
    })

    const regularExpresionEmail = /^\S+@\S+\.\S+$/
    const regularExpresionPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!regularExpresionEmail.test(values.email)) error.email = 'E-mail no válido.'
    if (!values.email.length) error.email = ''
    if (!regularExpresionPassword.test(values.password)) error.password = 'Debe tener al menos 1 letra o numero.'
    if (values.password.length < 8) error.password = 'Debe tener al menos 8 caracteres.'
    if (!values.password.length) error.password = ''
    if (isRegistrando && !error.password) {
      values.password === values.passwordRegister || (error.password = 'Las contraseñas deben coincidir')
    }
    setErrors({
      ...values,
      email: error.email,
      password: error.password
    })
  }

  // FIREBASE

  function handleLogIn (type, correo, password) {
    async function passToken () {
      firebase.auth().currentUser.getIdToken().then(token => {
        dispatch(logIn(token))
      })
    }

    function toaster (message = 'Login exitoso') {
      toast({
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: false
      })
    }
    try {
      if (type === 'google') {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(user => user && passToken())
          .then(() => toaster())
      }
      if (type === 'email') {
        firebase.auth().signInWithEmailAndPassword(correo, password)
          .then(user => user && passToken())
          .then(() => (toaster()))
      }
      if (type === 'register') {
        firebase.auth().createUserWithEmailAndPassword(correo, password)
          .then(user => user && passToken())
          .then(() => (toaster('Usuario Registrado con Exito')))
      }
      setState(false)
    } catch (error) {
      console.log(error)
      toast({
        description: `${error}`,
        status: 'failure',
        duration: 5000,
        isClosable: false
      })
    }
  }

  return (
    <>
      {state &&
        <div className={s.overlay}>
          <div className={s.container}>
            <Flex flexDirection='column'>
              <Flex cursor='pointer' justifyContent='flex-end'>
                <AiOutlineClose color='black' onClick={handleClick} size={30} />
              </Flex>
              {children}
              <Stack mt={6} spacing={4}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    children={<MdAlternateEmail />} //eslint-disable-line
                  />
                  <Input focusBorderColor='none' isInvalid={errors.email && true} required color='black' name='email' value={values.email} onChange={handleChange} type='tel' placeholder='E-mail' />
                </InputGroup>
                {errors.email && <Text color='red'>{errors.email}</Text>}
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children={<MdOutlineLock />} //eslint-disable-line
                  />
                  <Input type={show ? 'text' : 'password'} focusBorderColor='none' isInvalid={errors.password && true} required color='black' name='password' value={values.password} onChange={handleChange} placeholder='Contraseña' />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={ShowPassword}>
                      {show ? 'Ocultar' : 'Mostrar'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {isRegistrando &&
                  <>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children={<MdOutlineLock />} //eslint-disable-line
                      />
                      <Input type={show ? 'text' : 'password'} focusBorderColor='none' isInvalid={errors.password && true} required color='black' name='passwordRegister' value={values.passwordRegister} onChange={handleChange} placeholder='Contraseña' />
                      <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={ShowPassword}>
                          {show ? 'Ocultar' : 'Mostrar'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </>}
                {errors.password && <Text color='red'>{errors.password}</Text>}

                <Flex flexDirection='column' justifyContent='center'>
                  <Button onClick={handleSubmit} color='black' mt={3}>{isRegistrando ? 'Registrarse' : 'Iniciar sesión'}</Button>
                  <Button onClick={() => handleLogIn('google')} color='black' mt='10px' leftIcon={<FcGoogle />}>Continuar con Google</Button>
                  <Button color='black' mt='10px' onClick={() => setIsRegistrando(!isRegistrando)}>{isRegistrando ? '¿Ya tienes cuenta? Inicia sesion!' : 'Registrate gratis!'}</Button>
                </Flex>
              </Stack>
            </Flex>
          </div>
        </div>}
    </>
  )
}

export default ModalLogin
