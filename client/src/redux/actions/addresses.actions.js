import { postAddress, getAddresses, putAddress, deleteAddress } from '../../services/addresses'
import { GET_ADDRESSES, SET_TOAST } from '../constants'

export const createNewAddress = (newAddress) => {
  return async (dispatch) => {
    try {
      const { data, message } = await postAddress(newAddress)
      const toast = {
        title: 'Direccion Agregada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_ADDRESSES,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos guardar tu direccion.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const getUserAddresses = () => {
  return async (dispatch) => {
    try {
      const { data } = await getAddresses()

      dispatch({
        type: GET_ADDRESSES,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos recuperar la lista de direcciones.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const updateAddress = (addressId, newValues) => {
  return async (dispatch) => {
    try {
      const { data, message } = await putAddress(addressId, newValues)
      const toast = {
        title: 'Direccion Actualizada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_ADDRESSES,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos actualizar la dirección.',
        status: 'success',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const removeAddress = (addressId) => {
  return async (dispatch) => {
    try {
      const { data, message } = await deleteAddress(addressId)
      const toast = {
        title: 'Direccion Eliminada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_ADDRESSES,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos guardar tu direccion.',
        status: 'error',
        duration: 3500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}
