import { postProduct, getProducts, getProduct, putProduct, deleteProduct } from '../../services/products'
import { GET_PRODUCTS, GET_PRODUCT_DETAILS, ADD_PRODUCTS_FILTER, SET_TOAST, CLEAR_PRODUCTS_FILTER, SET_PRODUCTS_SORTING } from '../constants'

export const createNewProduct = (newProduct) => {
  return async (dispatch) => {
    try {
      const productsList = await postProduct(newProduct)
      const toast = {
        title: 'Producto Agregada!',
        description: 'Podras ver el progreso de tu compra en tu perfil.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: productsList
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

export const getProductsList = (searchOptions) => {
  return async (dispatch) => {
    try {
      const productList = await getProducts(searchOptions)

      dispatch({
        type: GET_PRODUCTS,
        payload: productList
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
      const product = await getProduct(productId)

      dispatch({
        type: GET_PRODUCT_DETAILS,
        payload: product
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

export const updateProduct = (productId) => {
  return async (dispatch) => {
    try {
      const productsList = await putProduct(productId)
      const toast = {
        title: 'Producto Actualizado.',
        description: 'Se veran reflejados los cambios inmediatamente.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: productsList
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

export const removeProduct = (productId) => {
  return async (dispatch) => {
    try {
      const productsList = await deleteProduct(productId)
      const toast = {
        title: 'Producto Eliminado.',
        description: 'Ya no estara disponible para la venta.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_PRODUCTS,
        payload: productsList
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
