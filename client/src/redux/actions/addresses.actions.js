import { getAddresses, postAddress, deleteAddress, putAddress } from '../../services/addresses'
import { GET_ADDRESSES, UPDATE_ADDRESSES } from '../constants'

export const getUserAddresses = () => {
  return async (dispatch) => {
    try {
      const response = await getAddresses()

      dispatch({
        type: GET_ADDRESSES,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: GET_ADDRESSES,
        payload: error
      })
    }
  }
}

export const createNewAddress = (newAddress, token) => {
  return async (dispatch) => {
    try {
      const response = await postAddress(newAddress, token)
      response.toast = {
        title: 'Direccion Agregada.',
        description: 'Ya puedes recibir ahi tu envío.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: UPDATE_ADDRESSES,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: UPDATE_ADDRESSES,
        payload: error
      })
    }
  }
}

export const removeAddress = (addressId) => {
  return async (dispatch) => {
    try {
      const response = await deleteAddress(addressId)
      response.toast = {
        title: 'Direccion Eliminada.',
        description: 'Ya no recibiras envios ahi.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: UPDATE_ADDRESSES,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: UPDATE_ADDRESSES,
        payload: error
      })
    }
  }
}

export const updateAddress = (addressId) => {
  return async (dispatch) => {
    try {
      const response = await putAddress(addressId)
      response.toast = {
        title: 'Direccion Actualizada.',
        description: 'Tus envios podran llegar ahi.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: UPDATE_ADDRESSES,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: UPDATE_ADDRESSES,
        payload: error
      })
    }
  }
}
