import { postAddress, getAddresses, putAddress, deleteAddress } from '../../services/addresses'
import { GET_ADDRESSES, SET_TOAST } from '../constants'

export const createNewAddress = (newAddress) => {
  return async (dispatch) => {
    try {
      const addressList = await postAddress(newAddress)
      const toast = {
        title: 'Direccion Agregada.',
        description: 'Ya puedes recibir ahi tu envío.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_ADDRESSES,
        payload: addressList
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
        duration: 4500,
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
      const addressList = await getAddresses()

      dispatch({
        type: GET_ADDRESSES,
        payload: addressList
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos recuperar la lista de direcciones.',
        status: 'error',
        duration: 4500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}

export const updateAddress = (addressId) => {
  return async (dispatch) => {
    try {
      const response = await putAddress(addressId)
      const toast = {
        title: 'Direccion Actualizada.',
        description: 'Tus envios podran llegar ahi.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_ADDRESSES,
        payload: response
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
        duration: 6500,
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
      const response = await deleteAddress(addressId)
      const toast = {
        title: 'Direccion Eliminada.',
        description: 'Ya no recibiras envios ahi.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_ADDRESSES,
        payload: response
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
        duration: 4500,
        isClosable: true
      }
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    }
  }
}
