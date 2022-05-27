import { postBrand, getBrands, putBrand, deleteBrand } from '../../services/brands'
import { GET_BRANDS, SET_TOAST } from '../constants'

export const createNewBrand = (newBrand) => {
  return async (dispatch) => {
    try {
      const { data, message } = await postBrand(newBrand)
      const toast = {
        title: 'Marca Agregada!',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_BRANDS,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos guardar la marca.',
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

export const getBrandsList = () => {
  return async (dispatch) => {
    try {
      const { data } = await getBrands()

      dispatch({
        type: GET_BRANDS,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de marcas.',
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

export const updateBrand = (brandId, newValues) => {
  return async (dispatch) => {
    try {
      const { data, message } = await putBrand(brandId, newValues)
      const toast = {
        title: 'Marca Actualizada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_BRANDS,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos actualizar la marca.',
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

export const removeBrand = (brandId) => {
  return async (dispatch) => {
    try {
      const { data, message } = await deleteBrand(brandId)
      const toast = {
        title: 'Marca Eliminada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_BRANDS,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos eliminar la marca.',
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
