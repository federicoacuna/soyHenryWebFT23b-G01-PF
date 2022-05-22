import LabelInput from '../LabelInput'
import { Select, Button, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { createNewPayment } from '../../redux/actions/payments.actions'
import { useDispatch } from 'react-redux'

export default function PaymentCreate ({ handleClickPayment }) {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    cardNumber: '',
    expirationDay: '',
    provider: '',
    paymentTypeId: ''
  })
  const [hasTried, setHasTried] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

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

  function handleSubmit () {
    if (handleClickPayment) {
      setHasTried(true)
      if (validate()) {
        navigate(-1)
        dispatch(createNewPayment(values))
        handleClickPayment()
      } else {
        toast({
          title: 'Falta informacion.',
          description: 'Por favor completa los campos obligatorios.',
          status: 'error',
          duration: 7000,
          isClosable: true
        })
      }
    } else {
      setHasTried(true)
      if (validate()) {
        dispatch(createNewPayment(values))
        navigate('/payment')
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
  }

  function handleSelect (e) {
    setValues({
      ...values,
      paymentTypeId: e.target.value
    })
  }

  function validate () {
    const error = {}
    setErrors({})
    if (!values.cardNumber) {
      error.cardNumber = 'Debe ingresar los números de la tarjeta'
      return false
    }
    if (!values.expirationDay) {
      error.expirationDay = 'Debe ingresar una fecha'
      return false
    }
    if (!values.provider) {
      error.provider = 'Indicar proveedor'
      return false
    }
    setErrors(error)
    if (Object.values(error).length === 0) { return true }
  }
  return (
    <div>
      <form>
        <Select placeholder='Método de pago' onChange={(e) => handleSelect(e)}>
          <option value='1'>Tarjeta de Crédito</option>
          <option value='2'>Tarjeta de Débito</option>
        </Select>
        <LabelInput
          label='Número de Tarjeta'
          placeholder='Número de Tarjeta'
          onChange={handleInputChange}
          name='cardNumber'
          value={values.cardNumber}
        />
        {errors.cardNumber && <p>{errors.cardNumber}</p>}
        <LabelInput
          label='Fecha de Vencimiento'
          placeholder='Fecha de Vencimiento'
          onChange={handleInputChange}
          name='expirationDay'
          value={values.expirationDay}
        />
        {errors.expirationDay && <p>{errors.expirationDay}</p>}
        <LabelInput
          label='Proveedor'
          placeholder='Proveedor'
          onChange={handleInputChange}
          name='provider'
          value={values.provider}
        />
        {errors.provider && <p>{errors.provider}</p>}
      </form>
      <Button name='Cancelar' onClick={handleBackClick}>Cancelar</Button>
      <Button name='Crear' onClick={handleSubmit}>Continuar</Button>
    </div>
  )
}
