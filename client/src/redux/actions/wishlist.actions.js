import { GET_WISHLIST, SET_TOAST } from '../constants'
import { postWishlistItem, getWishList, deleteWishlistItem } from '../../services/wishList'

export const addToWishlist = (productId) => {
  return async (dispatch) => {
    try {
      const { data, message } = await postWishlistItem(productId)
      const toast = {
        title: 'Agregado <3.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_WISHLIST,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error wishlist.',
        description: 'No pudimos recuperar el listado de favoritos.',
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

export const getUserWishList = () => {
  return async (dispatch) => {
    try {
      const { data } = await getWishList()

      dispatch({
        type: GET_WISHLIST,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos agregar el producto al listado de favoritos.',
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

export const removeFromWishlist = (productId) => {
  return async (dispatch) => {
    try {
      const { data, message } = await deleteWishlistItem(productId)
      const toast = {
        title: 'Eliminado </3.',
        description: message,
        status: 'success',
        duration: 4500,
        isClosable: true
      }
      dispatch({
        type: GET_WISHLIST,
        payload: data
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos eliminar el producto del listado de favoritos.',
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
