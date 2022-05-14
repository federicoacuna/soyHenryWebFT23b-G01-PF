import React from 'react'
import s from '../ModalLogin/index.module.css'
import { Stack, InputGroup, Input, Button, Flex, Text, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAlternateEmail, MdOutlineLock } from 'react-icons/md'
import { Link } from 'react-router-dom'

export const ModalLogin = ({ children, onToggle, state, setState }) => {
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

  const handleSubmit = () => {
    if (!values.email || !values.password) {
      toast({
        description: 'E-mail y contraseña son requeridos.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
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
  React.useEffect(() => {
    validate()
  }, [values]) //eslint-disable-line

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
                  <Button color='black' mt='10px' leftIcon={<FcGoogle />}>Continuar con Google</Button>
                  <Link to='/signup'><Text color='black' mt={1} mb={10} textAlign='center'>¿No tienes una cuenta? Registrate gratis.</Text></Link>
                </Flex>
              </Stack>
            </Flex>
          </div>
        </div>}
    </>
  )
}

export default ModalLogin
