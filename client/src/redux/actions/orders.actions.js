import { postOrder, getOrders, getOrder, putOrder, deleteOrder } from '../../services/orders'
import { GET_ORDERS, GET_ORDER_DETAILS, SET_ORDER_ADDRESS, SET_ORDER_ITEMS, SET_TOAST, CLEAR_CREATED_ORDER } from '../constants'

export const createNewOrder = (newOrder) => {
  return async (dispatch) => {
    try {
      const ordersList = await postOrder(newOrder)
      const toast = {
        title: 'Orden Agregada!',
        description: 'Podras ver el progreso de tu compra en tu perfil.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_ORDERS,
        payload: ordersList
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos guardar la orden.',
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

export const getUserOrders = () => {
  return async (dispatch) => {
    try {
      const orderList = await getOrders()

      dispatch({
        type: GET_ORDERS,
        payload: orderList
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de ordenes.',
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

export const getOrdersList = (filters) => {
  return async (dispatch) => {
    try {
      const orderList = await getOrders(filters)

      dispatch({
        type: GET_ORDERS,
        payload: orderList
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de ordenes.',
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

export const getOrderDetails = (orderId) => {
  return async (dispatch) => {
    try {
      const order = await getOrder(orderId)
      console.log(order)
      dispatch({
        type: GET_ORDER_DETAILS,
        payload: order
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No se pudo recuperar el detalle de la orden.',
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

export const updateOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const ordersList = await putOrder(orderId)
      const toast = {
        title: 'Orden Actualizada.',
        description: 'Se veran reflejados los cambios inmediatamente.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_ORDERS,
        payload: ordersList
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No pudimos actualizar la orden.',
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

export const removeOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const ordersList = await deleteOrder(orderId)
      const toast = {
        title: 'Orden Eliminada.',
        description: 'La orden fue cancelada y los stocks reestablecidos.',
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_ORDERS,
        payload: ordersList
      })
      dispatch({
        type: SET_TOAST,
        payload: toast
      })
    } catch (error) {
      const toast = {
        title: 'Error interno.',
        description: 'No se pudo eliminar la orden.',
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

export const setOrderAddress = (address) => {
  return {
    type: SET_ORDER_ADDRESS,
    payload: address
  }
}

export const setOrderItems = (orderItems) => {
  return {
    type: SET_ORDER_ITEMS,
    payload: orderItems
  }
}

export const clearCreatedOrder = () => {
  return {
    type: CLEAR_CREATED_ORDER
  }
}
