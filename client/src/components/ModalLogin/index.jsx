import React from 'react'
import s from '../ModalLogin/index.module.css'
import { Stack, InputGroup, Input, Button, Flex, Text, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAlternateEmail, MdOutlineLock } from 'react-icons/md'
// import { Link } from 'react-router-dom'

// Firebase
// import { app } from '../../config/firebase-config'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

export const ModalLogin = ({ children, onToggle, state, setState, isRegistrando, setIsRegistrando }) => {
  const [auth, setAuth] = React.useState('')
  // React.useState(//eslint-disable-line
  //   false || window.localStorage.getItem('auth') === 'true'
  // )

  const [token, setToken] = React.useState('tuki') //eslint-disable-line

  const [values, setValues] = React.useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = React.useState({
    email: '',
    password: ''
  })
  const toast = useToast()
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true)
        window.localStorage.setItem('auth', 'true')
        userCred.getIdToken().then((token) => {
          setToken(token)
        })
      }
    })
    validate()
  }, [token,auth,isRegistrando,values]) //eslint-disable-line

  const handleChange = (e) => {
    validate()
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleClick = () => {
    setState(false)
    setValues({
      email: '',
      password: ''
    })
    // onToggle()
  }
  function crearUsuario (correo, password) {
    firebase.auth().createUserWithEmailAndPassword(correo, password)
      .then((userFirebase) => {
        console.log(userFirebase)
        setAuth(userFirebase)
      })
  }

  function iniciarSesion (correo, password) {
    firebase.auth().signInWithEmailAndPassword(correo, password)
      .then((userFirebase) => {
        setAuth(userFirebase)
      })

      .catch(error => {
        alert('user invalid')
        console.log(error)
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
      crearUsuario(correo, password)
    }
    if (!isRegistrando) {
      iniciarSesion(correo, password)
    }
    handleClick()
  }

  const ShowPassword = () => {
    setShow(!show)
    // onToggle()
  }

  const validate = () => {
    let error = {}
    error = {}
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

    setErrors({
      ...values,
      email: error.email,
      password: error.password
    })
  }

  const loginWithGoogle = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        if (userCred) {
          setAuth(true)
          window.localStorage.setItem('auth', 'true')
          handleClick()
        }
      })
  }

  function handleLogOut () {
    if (auth) {
      firebase.auth().signOut()
        .then(() => {
          setAuth(false)
          setToken('')
          window.localStorage.setItem('auth', 'false')
          alert('sesion cerrada')
          handleClick()
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      alert('sin sesion iniciada')
    }
  }

  return (
    <>
      {state &&
        <div className={s.overlay}>
          <div className={s.container}>
            <Flex flexDirection='column'>
              <Flex cursor='pointer' justifyContent='flex-end'><AiOutlineClose color='black' onClick={handleClick} size={30} /></Flex>
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
                {errors.password && <Text color='red'>{errors.password}</Text>}

                <Flex flexDirection='column' justifyContent='center'>
                  <Button onClick={handleSubmit} color='black' mt={3}>Iniciar sesión</Button>
                  <Button onClick={loginWithGoogle} color='black' mt='10px' leftIcon={<FcGoogle />}>Continuar con Google</Button>
                  <Button color='black' mt='10px' onClick={() => setIsRegistrando(!isRegistrando)}>{isRegistrando ? '¿Ya tienes cuenta? Inicia sesion!' : 'Registrate gratis!'}</Button>
                </Flex>
                <Button color='black' mt='10px' onClick={handleLogOut}>Log out</Button>
              </Stack>
            </Flex>
          </div>
        </div>}
    </>
  )
}

// <Link to='/signup'><Text color='black' mt={1} mb={10} textAlign='center'>¿No tienes una cuenta? Registrate gratis.</Text></Link>

/* <button onClick={()=> setIsRegistrando(!isRegistrando)}> {isRegistrando ? "Ya tienes cuenta? Inicia sesion!" : "No tienes cuenta? Registrate gratis!" }</button> */
export default ModalLogin
