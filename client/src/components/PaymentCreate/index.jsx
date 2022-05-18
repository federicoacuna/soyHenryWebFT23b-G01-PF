import { LabelInput } from '../LabelInput/index'
import { Select } from '@chakra-ui/react'
import {ButtonPrimary} from '../ButtonPrimary/index'
import {ButtonSecondary} from '../ButtonSecondary/index'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {createNewPayment} from '../../redux/actions/index'
import {useState} from 'react'

export default function index() {
    const [errors, setErrors] = useState({}) 
    const [values, setValues] = useState({
        cardNumber:'',
        expirationDay: '',
        provider:'',
        paymentType: ''
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleInputChange(e){
        e.preventDefault()
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    function handleBackClick (){
        navigate('/address')
    }
    function handleClick (){
        validate() && dispatch(createNewPayment(values))
    }

    function handleSelect(e){
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    function validate (){
        let error = {}
        if(!values.cardNumber) {
            error.cardNumber = 'Debe ingresar los números de la tarjeta'
            return false
        }
        if(!values.expirationDay) {
            error.expirationDay = 'Debe ingresar una fecha'
            return false
        }
        if(!values.provider) {
            error.provider = 'Indicar proveedor'
            return false
        }
        setErrors(error)
    }
  return (
    <div>
        <form>
            <Select placeholder='Método de pago' onChange={(e)=>handleSelect(e)}>
                <option value='tajCred'>Tarjeta de Crédito</option>
                <option value='tarjDeb'>Tarjeta de Débito</option>
            </Select>
            <LabelInput
                label =  "Número de Tarjeta"
                placeholder = "Número de Tarjeta"
                onChange = {handleInputChange}
                name = "cardNumber"
                value = {values.cardNumber}
            />
            {errors.cardNumber && <p>{errors.cardNumber}</p>}
            <LabelInput
                label =  "Fecha de Vencimiento"
                placeholder = "Fecha de Vencimiento"
                onChange={handleInputChange}
                name = "expirationDay"
                value = {values.expirationDay}
            />
            {errors.expirationDay && <p>{errors.expirationDay}</p>}
            <LabelInput
                label =  "Proveedor"
                placeholder = "Proveedor"
                onChange={handleInputChange}
                name = "provider"
                value = {values.provider}
            />
            {errors.provider && <p>{errors.provider}</p>}
        </form>
        <ButtonSecondary
            text = "Cancelar"
            onClick={handleBackClick}
        />
        <ButtonPrimary
            text = "Continuar"
            onClick={handleClick}
        />
    </div>
  )
  
}
