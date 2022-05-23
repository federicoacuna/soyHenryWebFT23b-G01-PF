import LabelInput from '../LabelInput'
import { Select, Button, useToast, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createNewPayment } from '../../redux/actions/payments.actions'
import s from './index.module.css'

export default function PaymentCreate ({ handleClickPayment }) {
  const [errors, setErrors] = useState({
    cardNumber: '',
    expirationDay: '',
    provider: '',
    paymentTypeId: ''
  })
  const [values, setValues] = useState({
    cardNumber: '',
    expirationDay: '',
    provider: '',
    paymentTypeId: ''
  })
  const [hasTried, setHasTried] = useState(false) //eslint-disable-line
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const token = useSelector(state => state.token)

  useEffect(() => {
    hasTried && validate()
  }, [values]) //eslint-disable-line

  function handleInputChange (e) {
    e.preventDefault()
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  function handleBackClick () {
    if (handleClickPayment) {
      setHasTried(true)
      navigate(-1)
      handleClickPayment()
    } else {
      setHasTried(true)
      navigate('/payment')
    }
  }

  function handleSubmit (e) {
    if (e.target.name === 'Cancelar' && handleClickPayment) {
      setValues({
        cardNumber: '',
        expirationDay: '',
        provider: '',
        paymentTypeId: ''
      })
      return handleClickPayment()
    }
    if (e.target.name === 'Cancelar' && !handleClickPayment) {
      return navigate(-1)
    }
    setHasTried(true)

    if (validate() && token) {
      dispatch(createNewPayment(values))
      if (handleClickPayment) return handleClickPayment()
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

  function handleSelect (e) {
    setValues({
      ...values,
      paymentTypeId: e.target.value
    })
  }

  function validate (e) {
    const error = {
      cardNumber: '',
      expirationDay: '',
      provider: '',
      paymentTypeId: ''
    }
    setErrors({
      cardNumber: '',
      expirationDay: '',
      provider: '',
      paymentTypeId: ''
    })
    if (!values.cardNumber) {
      error.cardNumber = 'Debe ingresar los números de la tarjeta'
    }

    if (values.cardNumber.length < 16) {
      error.cardNumber = 'Debe tener 16 números'
    }
    if (!/^[0-9]*$/.test(values.cardNumber)) {
      error.cardNumber = 'Tarjeta invalida'
    }
    if (!values.expirationDay) {
      error.expirationDay = 'Debe ingresar una fecha'
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(values.expirationDay)) {
      error.expirationDay = 'Fecha invalida'
    }
    if (!values.provider) {
      error.provider = 'Indicar proveedor'
    }
    if (!/^[a-zA-Z]+$/.test(values.provider)) {
      error.provider = 'Provedor inválido'
    }
    if (values.paymentTypeId === '') {
      error.paymentTypeId = 'selecciona método de pago'
    }
    setErrors({
      cardNumber: error.cardNumber,
      expirationDay: error.expirationDay,
      provider: error.provider,
      paymentTypeId: error.paymentTypeId
    })
    if (Object.values(error)[0] == 0 && Object.values(error)[1] == 0 && Object.values(error)[2] == 0 && Object.values(error)[3] == 0) { return true } //eslint-disable-line
  }
  // console.log(values)
  return (
    <div className={s.container}>
      <Box>
        <form className={s.containerForm}>
          <Select mb='1rem' placeholder='Selecciona un método de pago' bg='white' color='black' border='1px' borderColor='black' _hover={{ color: 'black', cursor: 'pointer' }} _focus={{ outline: 'none' }} onChange={(e) => handleSelect(e)}>
            <option value='1'>Tarjeta de Crédito</option>
            <option value='2'>Tarjeta de Débito</option>
          </Select>
          <LabelInput
            placeholder='Número de Tarjeta'
            onChange={(e) => handleInputChange(e)}
            name='cardNumber'
            value={values.cardNumber}
          />
          {errors.cardNumber && <p>{errors.cardNumber}</p>}
          <LabelInput
            placeholder='Fecha de Vencimiento'
            onChange={(e) => handleInputChange(e)}
            name='expirationDay'
            value={values.expirationDay}
          />
          {errors.expirationDay && <p>{errors.expirationDay}</p>}
          <LabelInput
            placeholder='Proveedor'
            onChange={(e) => handleInputChange(e)}
            name='provider'
            value={values.provider}
          />
          {errors.provider && <p>{errors.provider}</p>}
        </form>
        <Button name='Cancelar' onClick={(e) => handleBackClick(e)} _hover={{ color: 'gray' }} color='#2C2C2E' border='2px' borderColor='#2C2C2E' mr='1rem'>Cancelar</Button>
        <Button name='Crear' onClick={(e) => handleSubmit(e)} _hover={{ color: 'gray' }} bg='#2C2C2E' color='white'>Continuar</Button>
      </Box>
    </div>
  )
}
