import { getPayments, postPayment, deletePayment, putPayment } from '../../services/payments'
import { GET_PAYMENTS, UPDATE_PAYMENTS } from '../constants'

export const getUserPayments = () => {
  return async (dispatch) => {
    try {
      const response = await getPayments()

      dispatch({
        type: GET_PAYMENTS,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: GET_PAYMENTS,
        payload: error
      })
    }
  }
}

export const createNewPayment = (newPayment) => {
  return async (dispatch) => {
    try {
      const response = await postPayment(newPayment)
      response.toast = {
        title: 'Metodo de pago Agregado.',
        description: 'Ya puedes abonar tu compra con el mismo.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: UPDATE_PAYMENTS,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: UPDATE_PAYMENTS,
        payload: error
      })
    }
  }
}

export const removePayment = (paymentId) => {
  return async (dispatch) => {
    try {
      const response = await deletePayment(paymentId)
      response.toast = {
        title: 'Metodo de pago Eliminado.',
        description: 'Ya no se podra utilizar el mismo.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: UPDATE_PAYMENTS,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: UPDATE_PAYMENTS,
        payload: error
      })
    }
  }
}

export const updatePayment = (paymentId) => {
  return async (dispatch) => {
    try {
      const response = await putPayment(paymentId)
      response.toast = {
        title: 'Metodo de pago Actualizado.',
        description: 'Ahora puedes pagar tu compra con el mismo.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: UPDATE_PAYMENTS,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: UPDATE_PAYMENTS,
        payload: error
      })
    }
  }
}
