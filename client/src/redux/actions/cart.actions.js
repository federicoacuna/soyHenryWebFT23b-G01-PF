import { postCart, putCartItem, postCartItem, deleteCartItem, getCart, putMergeCarts } from '../../services/cart'
import { ADD_CART_ITEM, UPDATE_CART, CLEAR_CART, UPDATE_REMOTE_CART, SET_TOAST } from '../constants'

export const updateCart = (cartItems) => {
  return {
    type: UPDATE_CART,
    payload: cartItems
  }
}

export const addCartItem = (product) => {
  return {
    type: ADD_CART_ITEM,
    payload: product
  }
}

export const clearLocalCart = () => {
  return {
    type: CLEAR_CART
  }
}

export const setRemoteCartProducts = (cartList) => {
  return async (dispatch) => {
    try {
      const { data } = await postCart(cartList)

      dispatch({
        type: UPDATE_REMOTE_CART,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: error.message,
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

export const changeRemoteCartItemQuantity = (cartItem) => {
  return async (dispatch) => {
    try {
      const { data } = await putCartItem(cartItem)

      dispatch({
        type: UPDATE_REMOTE_CART,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: error.message,
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

export const addRemoteCartItem = (productId) => {
  return async (dispatch) => {
    try {
      const { data, message } = await postCartItem(productId)

      const toast = {
        title: 'Agregado!',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: UPDATE_REMOTE_CART,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const { data, message } = error
      console.log(data, message)
      const toast = {
        title: 'Error interno!',
        description: error.message,
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

export const removeRemoteCartItem = (productId) => {
  return async (dispatch) => {
    try {
      const { data } = await deleteCartItem(productId)

      dispatch({
        type: UPDATE_REMOTE_CART,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: error.message,
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

export const getRemoteCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await getCart()

      dispatch({
        type: UPDATE_REMOTE_CART,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: error.message,
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

export const mergeLocalCart = (localCart) => {
  return async (dispatch) => {
    try {
      console.log(localCart)
      const { data, message } = await putMergeCarts(localCart)
      console.log(data)
      dispatch({
        type: UPDATE_REMOTE_CART,
        payload: data
      })
      if (message) {
        const toast = {
          title: 'Carrito guardado!',
          description: message,
          status: 'success',
          duration: 5000,
          isClosable: true
        }
        dispatch({
          type: SET_TOAST,
          payload: toast
        })
      }
    } catch (error) {
      const toast = {
        title: 'Error!',
        description: error.message,
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
