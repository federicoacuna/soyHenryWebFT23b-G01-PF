import { postBrand, getBrands, putBrand, deleteBrand } from '../../services/brands'
import { GET_BRANDS, SET_TOAST } from '../constants'

export const createNewBrand = (newBrand) => {
  return async (dispatch) => {
    try {
      const brandList = await postBrand(newBrand)
      const toast = {
        title: 'Marca Agregada!',
        description: 'Ya se podra operar con la misma.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_BRANDS,
        payload: brandList
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

export const getBrandsList = () => {
  return async (dispatch) => {
    try {
      const brandList = await getBrands()

      dispatch({
        type: GET_BRANDS,
        payload: brandList
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de marcas.',
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

export const updateBrand = (brandId) => {
  return async (dispatch) => {
    try {
      const response = await putBrand(brandId)
      const toast = {
        title: 'Marca Actualizada.',
        description: 'Ya se podra consulta la nueva informacion.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_BRANDS,
        payload: response
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

export const removeBrand = (brandId) => {
  return async (dispatch) => {
    try {
      const response = await deleteBrand(brandId)
      const toast = {
        title: 'Marca Eliminada.',
        description: 'Ya no estara disponible para operar.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_BRANDS,
        payload: response
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
