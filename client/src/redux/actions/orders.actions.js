import { postOrder, getOrders, getOrder, putOrder, deleteOrder } from '../../services/orders'
import { GET_ORDERS, GET_ORDER_DETAILS, SET_ORDER_ADDRESS, SET_ORDER_ITEMS, SET_TOAST, CLEAR_CREATED_ORDER, ADD_ORDERS_FILTER, CLEAR_ORDERS_FILTER } from '../constants'

export const createNewOrder = (newOrder) => {
  return async (dispatch) => {
    try {
      const { data, message } = await postOrder(newOrder)
      const toast = {
        title: 'Orden Agregada!',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_ORDERS,
        payload: data
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

export const getUserOrders = () => {
  return async (dispatch) => {
    try {
      const { data } = await getOrders()

      dispatch({
        type: GET_ORDERS,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de ordenes.',
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

export const getOrdersList = (filters) => {
  return async (dispatch) => {
    try {
      const { data } = await getOrders(filters)

      dispatch({
        type: GET_ORDERS,
        payload: data
      })
    } catch (error) {
      const toast = {
        title: 'Error interno!',
        description: 'No pudimos recuperar la lista de ordenes.',
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

export const getOrderDetails = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await getOrder(orderId)
      dispatch({
        type: GET_ORDER_DETAILS,
        payload: data
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

export const updateOrder = (orderId, newValues) => {
  return async (dispatch) => {
    try {
      const { data, message } = await putOrder(orderId, newValues)
      const toast = {
        title: 'Orden Actualizada.',
        description: message,
        status: 'success',
        duration: 6500,
        isClosable: true
      }
      dispatch({
        type: GET_ORDERS,
        payload: data
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

export const removeOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const { data, message } = await deleteOrder(orderId)
      const toast = {
        title: 'Orden Eliminada.',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true
      }
      dispatch({
        type: GET_ORDERS,
        payload: data
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

export const addOrderFilter = (filter) => {
  return {
    type: ADD_ORDERS_FILTER,
    payload: filter
  }
}

export const clearOrdersFilter = (filter) => {
  return {
    type: CLEAR_ORDERS_FILTER
  }
}
