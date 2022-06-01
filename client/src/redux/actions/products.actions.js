import { postProduct, getProducts, getProduct, putProduct, deleteProduct } from '../../services/products'
import { GET_PRODUCTS, GET_PRODUCT_DETAILS, ADD_PRODUCTS_FILTER, SET_TOAST, CLEAR_PRODUCTS_FILTER, SET_PRODUCTS_SORTING } from '../constants'

export const createNewProduct = (newProduct) => {
  return async (dispatch) => {
    try {
      const { data, message } = await postProduct(newProduct)
      const toast = {
        title: 'Producto Agregado!',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos guardar la producto.',
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

export const getProductsList = (searchOptions) => {
  return async (dispatch) => {
    try {
      const { data } = await getProducts(searchOptions)

      dispatch({
        type: GET_PRODUCTS,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de productos.',
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

export const getProductDetails = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await getProduct(productId)

      dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No se pudo recuperar el detalle del producto.',
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

export const updateProduct = (newValues) => {
  return async (dispatch) => {
    try {
      const { data, message } = await putProduct(newValues)
      const toast = {
        title: 'Producto Actualizado.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos actualizar el producto.',
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

export const removeProduct = (productId) => {
  return async (dispatch) => {
    try {
      const { data, message } = await deleteProduct(productId)
      const toast = {
        title: 'Producto Eliminado.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No se pudo eliminar la producto.',
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

export const addProductFilter = (filter) => {
  return {
    type: ADD_PRODUCTS_FILTER,
    payload: filter
  }
}

export const clearProductFilter = (filter) => {
  return {
    type: CLEAR_PRODUCTS_FILTER
  }
}

export const setProductSorting = (sort) => {
  return {
    type: SET_PRODUCTS_SORTING,
    payload: sort
  }
}
