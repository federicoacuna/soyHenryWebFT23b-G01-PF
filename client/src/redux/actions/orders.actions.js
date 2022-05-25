import { GET_ORDER_DETAILS, GET_ALL_ORDERS, UPDATE_ORDER } from '../constants'
import { getDetails, getOrders, orderUpdate } from '../../services/orders'

export const getOrderDetails = (orderId) => {
  return async (dispatch) => {
    try {
      const orderDetails = await getDetails(orderId)
      dispatch({
        type: GET_ORDER_DETAILS,
        payload: orderDetails
      })
    } catch (error) {
      dispatch({
        type: GET_ORDER_DETAILS,
        payload: error
      })
    }
  }
}

// ADMIN
export const getAllOrdersForAdm = () => {
  return async (dispatch) => {
    try {
      const allOrders = await getOrders()
      dispatch({
        type: GET_ALL_ORDERS,
        payload: allOrders
      })
    } catch (error) {
      dispatch({
        type: GET_ALL_ORDERS,
        payload: error
      })
    }
  }
}

export const updateOrderById = (orderId, value) => {
  return async (dispatch) => {
    try {
      const updateOrder = await orderUpdate(orderId, value)
      dispatch({
        type: UPDATE_ORDER,
        payload: updateOrder
      })
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER,
        payload: error
      })
    }
  }
}
